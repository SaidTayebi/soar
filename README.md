# Frontend Assessment

## Getting Started

### This project uses Next 15 and React 19

Install the dependencies:

```bash
npm i --legacy-peer-deps
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can visit the vercel live demo [`here`](https://soar-finance.vercel.app).

## Extra features and improvements

- [x] Skeletons and loaders for the widgest
- [x] Mock API calls using `react-query`
- [x] Mock Quick Transfer API call and shake animation if no amount or recepient is provided
- [x] Display a toast message when the quick transfer is successful

### Settings

- [x] Validate the profile form fields
- [x] Mock API call to save the profile
- [x] Display a toast message when the profile is saved
- [x] Possibility to reset the form if modified
- [x] Persist changes in the store using `jotai`
- [x] Edit profile picture and save it in the public folder using Next API Routes

### To improve

The overall responsiveness of the app could be improved and needs more testing accross all major browsers and platforms.
