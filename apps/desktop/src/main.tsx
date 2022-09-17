import { ColorScheme, ColorSchemeProvider, MantineProvider, AppShell } from "@mantine/core";
import { Theme, appWindow } from "@tauri-apps/api/window";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import App from "./App";
import { Sidebar } from "./components/Sidebar";
import "./style.css";

import { Store } from 'tauri-plugin-store-api';
const store = new Store('.settings.dat');

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);

function Main({ theme }: { theme: Theme }) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>(theme);
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <React.StrictMode>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                    <AppShell
                        padding="md"
                        navbar={<Sidebar />}
                    >
                        <RouterProvider router={router} />
                    </AppShell>
                </MantineProvider>
            </ColorSchemeProvider>
        </React.StrictMode>
    )
}

appWindow.theme().then((theme) => {
    store.get(`theme`).then((_customTheme) => {
        const customTheme = _customTheme as Theme | null
        if (customTheme !== null) {
            theme = customTheme
        }
        ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
            <Main theme={theme || `dark`} />
        );
    })

})

