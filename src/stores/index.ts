import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counterSlice'
import { accountSlice } from './slices/accountSlice'
import { myProblemListSlice } from './slices/myProblemListSlice'
import { myProblemSlice } from './slices/myProblemSlice'
import { problemSlice } from './slices/problemSlice'

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        counter: counterSlice.reducer,
        myProblemList: myProblemListSlice.reducer,
        myProblem: myProblemSlice.reducer,
        problem: problemSlice.reducer
    }
})



// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store