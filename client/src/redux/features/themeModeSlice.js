import { createSlice } from '@reduxjs/toolkit';

export const themeModeSlice = createSlice({
    name: 'ThemeMode',
    initialState: {
        themMode: 'dark',
    },
    reducers: {
        setThemeMode: (state, action) => {
            state.themMode = action.payload;
        },
    },
});

export const { setThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
