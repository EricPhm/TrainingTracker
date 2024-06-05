# Training Tracker

Fundamentals of React and browser APIs. Create a standalone single-page app (no REST service) that lets users keep track of their performance over time in multi-segmented challenges.

- Only functional components with hooks.
- Use React Router to navigate between the three screens.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Screens

### Challenge Listing Screen

The first thing users should see when they open the site is a list of challenges they've previously created.

- For each challenge, list the challenge's name and show a button that the user can press to go to the Challenge Recording Screen.
- At the end of the list of challenges, show a button that will take the user to the Challenge Creation Screen.

### Challenge Creation Screen

This screen lets users create a new challenge.

- A challenge consists of a name for the challenge itself plus a series of segments, each with its own name.
- Users should be able to add as many segments as they want and change the name of or remove any segment while creating the challenge.
- When the user is done filling out the name and segments of the challenge, they can press a button to add the challenge and return to the list of all their challenges.

### Challenge Recording Screen

This screen lets users track their times while performing a challenge.

- At the top of the screen is the overall timer for the challenge.
- Below the overall timer is a list of the segments and the time when the user completed each segment.

When the user first arrives at the screen:

- The timer should be at 0.
- None of the segments should have a time next to them.
- The only action the user can take is to press the "Start" button.

When the user presses the "Start" button:

- The overall timer should start running.
- The "Start" button should be replaced with three buttons: "Next segment", "Pause", and "End".

  - **Next segment**: When the user presses "Next segment", take a snapshot of the overall timer's current value and list that next to the next segment.
  - **Pause**: When the user presses "Pause", the timer should stop until the user presses the "Continue" button again.
  - **End**: When the user presses "End", the timer should stop and the user should not be able to press any of the buttons. The user should be able to review their times after they're done, but the only action they should be able to take is using the back button or address bar to navigate away.

## Navigation

- Use React Router to navigate between the three screens:
  - Challenge Listing Screen
  - Challenge Creation Screen
  - Challenge Recording Screen
