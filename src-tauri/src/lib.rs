use tauri::{
    tray::TrayIconBuilder,
    menu::{Menu, MenuItem},
    Manager, PhysicalPosition, Emitter,
};
use tauri_plugin_positioner::{Position, WindowExt};

#[tauri::command]
fn set_click_through(window: tauri::WebviewWindow, enabled: bool) -> Result<(), String> {
    window.set_ignore_cursor_events(enabled).map_err(|e| e.to_string())
}

#[tauri::command]
fn reset_position(window: tauri::WebviewWindow) -> Result<(), String> {
    window.move_window(Position::BottomRight).map_err(|e| e.to_string())
}

#[tauri::command]
fn drag_window(window: tauri::WebviewWindow) -> Result<(), String> {
    window.start_dragging().map_err(|e| e.to_string())
}

#[tauri::command]
fn reveal_window(window: tauri::WebviewWindow) -> Result<(), String> {
    if let Ok(Some(monitor)) = window.current_monitor() {
        let size = monitor.size();
        let pos = window.outer_position().unwrap_or(PhysicalPosition::new(0, 0));
        let clamped_x = pos.x.clamp(0, (size.width as i32).saturating_sub(220));
        let clamped_y = pos.y.clamp(0, (size.height as i32).saturating_sub(260));
        let _ = window.set_position(PhysicalPosition::new(clamped_x, clamped_y));
    }
    window.show().map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().build())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            None,
        ))
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            set_click_through, reset_position, drag_window, reveal_window
        ])
        .setup(|app| {
            let show = MenuItem::with_id(app, "show", "Open Menu", true, None::<&str>)?;
            let reset = MenuItem::with_id(app, "reset", "Reset Position", true, None::<&str>)?;
            let toggle_mode = MenuItem::with_id(app, "toggle_mode", "Toggle Passive/Active", true, None::<&str>)?;
            let quit = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&show, &reset, &toggle_mode, &quit])?;

            let _tray = TrayIconBuilder::new()
                .menu(&menu)
                .on_menu_event(move |app, event| {
                    if let Some(window) = app.get_webview_window("mochi") {
                        match event.id.as_ref() {
                            "show" => { window.show().ok(); window.set_focus().ok(); }
                            "reset" => { let _ = window.move_window(Position::BottomRight); }
                            "toggle_mode" => { app.emit_to("mochi", "toggle-passive-mode", ()).ok(); }
                            "quit" => { app.exit(0); }
                            _ => {}
                        }
                    }
                })
                .build(app)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}