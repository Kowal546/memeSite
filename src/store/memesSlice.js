import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

export const fetchMemes = createAsyncThunk("memes/fetchMemes", async () => {
  const response = await fetch("https://api.imgflip.com/get_memes");
  const data = await response.json();

  if (!data.success || !data.data.memes) {
    throw new Error("Failed to fetch memes from Imgflip");
  }

  return data.data.memes.map((meme, index) => ({
    id: meme.id,
    title: meme.name,
    upvotes: Math.floor(Math.random() * 10),
    downvotes: Math.floor(Math.random() * 5),
    starred: false,
    img: meme.url,
  }));
});

const initialState = {
  memes: [],
  status: "idle",
  error: null,
};

const memesSlice = createSlice({
  name: "memes",
  initialState,
  reducers: {
    upvote: (state, action) => {
      const meme = state.memes.find((m) => m.id === action.payload);
      if (meme) {
        meme.upvotes += 1;
      }
    },

    downvote: (state, action) => {
      const meme = state.memes.find((m) => m.id === action.payload);
      if (meme) {
        meme.downvotes += 1;
      }
    },

    toggleStar: (state, action) => {
      const meme = state.memes.find((m) => m.id === action.payload);
      if (meme) {
        meme.starred = !meme.starred;
      }
    },

    addMeme: (state, action) => {
      const newMeme = {
        id: Math.max(...state.memes.map((m) => m.id)) + 1,
        upvotes: 0,
        downvotes: 0,
        ...action.payload,
      };
      state.memes.push(newMeme);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.memes = action.payload;
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { upvote, downvote, toggleStar, addMeme } = memesSlice.actions;

export const selectAllMemes = (state) => state.memes.memes;
export const selectMemesStatus = (state) => state.memes.status;
export const selectMemesError = (state) => state.memes.error;

export const selectHotMemes = createSelector(
  [selectAllMemes],
  (memes) => memes.filter(meme => meme.upvotes - meme.downvotes >= 5)
);

export const selectRegularMemes = createSelector(
  [selectAllMemes],
  (memes) => memes.filter(meme => meme.upvotes - meme.downvotes < 5)
);

export const selectFavouriteMemes = createSelector(
  [selectAllMemes],
  (memes) => memes.filter(meme => meme.starred === true)
);

export default memesSlice.reducer;
