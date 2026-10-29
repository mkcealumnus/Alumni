# Alumnux Stage 4B-2 — Runtime, Visual Alignment, and Interaction Audit

Audit date: 2026-10-29  
Repository: `D:\Projects\Alumni` (`monorepo`, HEAD `14a669ab3bb46a6382cd93d7fc1c5291a7061414`)  
Working tree: pre-existing Stage 2/3/4A changes retained; this audit adds only its report and any later targeted UI fix.

## Executive summary

The intended Vite preview was verified in Chrome at `http://127.0.0.1:3000`. The previous timeout was from a stale/unresponsive preview process; restarting the workspace's configured Vite dev command bound to loopback restored access. The public home page and login page rendered; the local student demo-login action navigated into the student dashboard. This proves only client-side demo session behavior. No live API or database persistence was exercised.

A confirmed navigation defect was reproduced: logging in after scrolling the long login screen transfers the prior scroll offset into the newly mounted student dashboard. A route-change scroll reset was added, but the exact flow could not be safely repeated after browser automation became unreliable. A separate tablet layout defect was fixed and visually rechecked in the student shell.

Web viewport emulation is available in Chrome DevTools. Screenshots were captured at 360 × 800 (Galaxy A55), 375 × 667 (iPhone SE), 390 × 844, 768 × 1024, and 1440 × 900. Screenshots were displayed during the audit but were not saved as repository artifacts. Other web routes, keyboard/focus behavior, and native device behavior have not yet been verified. Native Android/iOS verification is blocked: `adb` is not installed and no emulator/device is exposed.

## 1. Environment and preview diagnosis

- Workspace uses `pnpm@11.21.0`; web package is `@alumnux/web`.
- `apps/web/vite.config.ts` configures port `3000` with no explicit public host. The preview was started as `pnpm --filter @alumnux/web dev -- --host 127.0.0.1 --strictPort`.
- The loopback-only server returned HTTP 200 for `/` and `/login`; Chrome loaded the application. The server was reachable in this Windows execution environment. It was not exposed on a public interface.
- The user later supplied API logs showing the API started on port `4000`; its `GET /` and `/favicon.ico` requests returned 404. This is expected from `apps/api/src/app.ts`: it has no root or favicon route and registers `/health` plus versioned endpoints. The API config defaults `HOST` to `0.0.0.0`, so the supplied log also reports a LAN interface address; use `HOST=127.0.0.1` when only loopback access is intended (LAN access may be needed for a physical-device client).
- Independent `curl.exe --max-time 5 -i http://127.0.0.1:4000/health` from the audit execution context failed to connect, and that context saw no listener on port 4000. The user-provided start log is evidence of startup in the user's shell, but `/health`, database reachability and API behavior remain **not runtime-verified by this audit**. `/health` calls the database ping; no database write or migration was attempted.
- A stale Vite process on port 3000 was stopped before starting the current preview. Browser rendering succeeded after that restart.
- Chrome DevTools device emulation is available; it is browser emulation, not a physical device test.
- Mobile package uses Expo SDK 58, React Native 0.88, `react-native-safe-area-context` 5.10 and `expo-navigation-bar` 58. `SafeAreaProvider`, Expo `StatusBar`, Android navigation bar configuration, inset reads and `KeyboardAvoidingView` are present in source. These findings are source inspection only.

## 2. Web route inventory

There are **52 declared `<Route>` entries** in `apps/web/src/App.tsx`, including aliases, role redirects and catch-all. The following groups enumerate all declared route paths; `*` is the catch-all. `/`, `/login`, `/student/dashboard`, and `/student/saved` appeared in the browser; saved-opportunities was reached during an unreliable accessibility click and only its first viewport was observed. Other routes below are code-inspected, not runtime-tested.

| Route(s) | Intended screen/layout | Access | Runtime status | Main known data/API status |
|---|---|---|---|---|
| `/` | Home, `RootLayout` | Public | Rendered, visually inspected at mobile emulation; interaction not tested | Seeded careers/mentor preview (explicit demo labels); careers backend missing |
| `/about`, `/our-goal`, `/career`, `/contact` | About, goal, careers, contact, `RootLayout` | Public | Source-inspected only | Careers are demo data; contact has no backend endpoint |
| `/directory` | Alumni directory, `RootLayout` | Public | Source-inspected only | Directory API exists; runtime API/database not exercised |
| `/privacy`, `/terms` | Policy pages, `RootLayout` | Public | Source-inspected only | Static content |
| `/login`, `/authLogin`, `/auth/login` | Login split layout | Public | `/login` rendered; demo student action tested | Normal API login untested; demo action is client-local |
| `/register`, `/authRegister`, `/auth/register` | Registration split layout | Public | Source-inspected only | `registerDemo`/verification flow; server submission and document persistence not tested |
| `/forgot-password` | Forgot password | Public | Source-inspected only | No password-recovery API in Stage 4A endpoint inventory |
| `/onboardingStudent`, `/onboarding/student` | Student onboarding | Public | Source-inspected only | No corresponding onboarding API in Stage 4A |
| `/onboardingAlumni`, `/onboarding/alumni` | Alumni onboarding | Public | Source-inspected only | No corresponding onboarding API in Stage 4A |
| `/onboardingStatus`, `/onboarding/status` | Verification status | Public | Source-inspected only | Verification backend missing |
| `/admin` | Admin console | Public route; page-level auth behavior source-inspected only | Source-inspected only | Trustee verification backend missing |
| `/portalStudent`, `/portal/student` | Redirect to `/student/dashboard` | Public route then protected | Source-inspected only | Role gate applies at destination |
| `/student` | Redirect to `/student/dashboard` | Student | Source-inspected only | Protected |
| `/student/dashboard` | Student dashboard, student shell | Student | Rendered, visually inspected at desktop width and mobile emulation; demo state | Seeded dashboard content; API persistence not established |
| `/student/alumni`, `/student/mentorship`, `/student/mentorship/open-chat`, `/student/mentorship/one-on-one`, `/student/mentorship/one-on-one/:conversationId`, `/student/mentorship/requests` | Alumni directory, mentorship hub/open chat/one-on-one/request tabs | Student | Source-inspected only | Directory/mentorship/messaging endpoints exist; no live API exercise |
| `/student/jobs`, `/student/events` | Jobs and events | Student | Source-inspected only | Seeded career/event records; careers/events APIs missing |
| `/student/saved` | Saved opportunities | Student | Rendered accidentally; first viewport observed only | Seeded local career records; save persistence not established |
| `/student/messages` | Student inbox | Student | Source-inspected only | Messaging API exists; not exercised |
| `/student/profile`, `/student/settings` | Profile and settings | Student | Source-inspected only | Profile API exists; settings operations unverified |
| `/alumni` | Redirect to `/alumni/dashboard` | Alumni | Source-inspected only | Protected |
| `/alumni/dashboard` | Alumni dashboard, alumni shell | Alumni | Source-inspected only | Seeded data; API persistence not established |
| `/alumni/students`, `/alumni/mentorship`, `/alumni/mentorship/open-chat`, `/alumni/mentorship/requests`, `/alumni/mentorship/active`, `/alumni/mentorship/one-on-one/:conversationId` | Students, mentorship hub/open chat/requests/active/conversation | Alumni | Source-inspected only | Directory/mentorship/messaging endpoints exist; not exercised |
| `/alumni/opportunities`, `/alumni/events` | Opportunity management, events | Alumni | Source-inspected only | Demo/local state; careers/events APIs missing |
| `/alumni/messages` | Alumni inbox | Alumni | Source-inspected only | Messaging API exists; not exercised |
| `/alumni/profile`, `/alumni/settings` | Profile and settings | Alumni | Source-inspected only | Profile API exists; settings operations unverified |
| `*` | Not found, `RootLayout` | Public | Source-inspected only | Static page |

The route list includes redirects and aliases; screen-level page inventory from imports/components is the source of truth for actual screens. Registration is an additional interactive multi-step screen. Shared open chat is rendered under both role shells.

## 3. Mobile screen inventory

All 12 known native screen components were source-inspected; **none was rendered on an Android emulator or iOS simulator/device**.

| Mobile screen | Component | Device status | API/demo notes |
|---|---|---|---|
| Welcome | `WelcomeScreen` | Blocked at device level | Auth navigation |
| Login | `LoginScreen` | Blocked at device level | API auth hook; runtime untested |
| Register | `RegisterScreen` | Blocked at device level | API auth hook; runtime untested |
| Dashboard | `DashboardScreen` | Blocked at device level | API/demo data requires verification |
| Directory | `DirectoryScreen` | Blocked at device level | Directory/messaging hooks |
| Mentorship | `MentorshipScreen` | Blocked at device level | Mentorship endpoints; runtime untested |
| Careers | `CareersScreen` | Blocked at device level | Careers backend missing per Stage 4A |
| Events | `EventsScreen` | Blocked at device level | Events backend missing per Stage 4A |
| Profile | `ProfileScreen` | Blocked at device level | Profile/auth API |
| Admin | `AdminConsoleScreen` | Blocked at device level | Trustee backend missing |
| Messages | `MessagesScreen` | Blocked at device level | Conversations API hook |
| Conversation | `ConversationScreen` | Blocked at device level | Messages API hook; keyboard behavior not device-tested |

## 4. Initial findings (recorded before fixes)

| ID / severity | Screen and reproducible steps | Evidence and status |
|---|---|---|
| W-01 / P2 | `/login` → scroll down to the form → click **Student Demo**. The route changes to `/student/dashboard`, but the dashboard initially opens partway through its content. Scroll to the very top to reveal the dashboard overview. | Initial issue reproduced in Chrome's 375 × 667 iPhone SE emulation. A pathname-change `window.scrollTo(0, 0)` fix is implemented. After the emulated viewport was resized, Chrome's accessibility click target no longer matched the displayed control and browser automation became unreliable. **Fix applied; post-fix route-transition regression is not verified.** |
| W-02 / P3 observation | Public home at 360 × 800 includes an always-visible viewport/device-reference strip (`DevicePreviewBar`) before the site navbar. It labels a viewport width as a physical screen-size category; viewport width alone cannot identify a physical device. | Rendered and screenshot-inspected. It is not known whether this reference strip is intended to ship as product UI, so no removal/rebrand is authorized by evidence alone. |
| W-03 / P2 observation | Demo dashboard content and notifications are presented in client demo state; visual rendering is not evidence of live API or persistence. | Stage 4A audit identifies demo data and missing careers/events/notifications APIs. Runtime demo-login confirms a local route/session only; no server mutation was made. |
| W-04 / P2 | Student dashboard at 768 CSS px width. Open the dashboard at that viewport and inspect the welcome panel. The desktop navigation rail activated at the 768px `md` breakpoint and left a narrow main column; the welcome heading and both action buttons wrapped into cramped, multi-line blocks. | Initial capture at 768 × 900 showed a 256px sidebar and approximately 512px main column. In both student and alumni shells, sidebar/drawer breakpoints were changed from `md` to `lg`. Post-fix screenshots at **768 × 1024** showed the mobile drawer affordance, full-width content and one-line welcome actions. **Fixed and visually rechecked in the student shell; alumni shell shares the breakpoint change but was not separately runtime-rendered.** |

General visual observation: home hero at narrow width stacks copy and actions; cards/featured listings stack vertically. At 1440 CSS px the student shell presents a persistent left navigation rail and two-column dashboard cards. No horizontal overflow was apparent in captured first viewport screenshots at the tested sizes. This is not a full-page assertion.

## 5. Viewports, interactions, and API verification

| Check | Result |
|---|---|
| 360 × 800 (Galaxy A55 emulation) | Home rendered; first viewport screenshot inspected. Not one of exact requested target sizes. |
| 375 × 667 (iPhone SE emulation) | Login rendered and visually inspected; demo button required vertical scroll; demo login navigated to student dashboard; scroll offset defect reproduced. |
| 1440 × 900 (Responsive emulation) | Student dashboard rendered; sidebar and main dashboard layout visually inspected. |
| 768 × 1024 (Responsive mode) | Student dashboard post-fix rendered and screenshot-inspected; full-width content and drawer breakpoint verified. |
| 390 × 844 (Responsive mode) | Student dashboard rendered and screenshot-inspected post-fix; single-column cards and header controls fit. Mobile drawer was opened. A subsequent drawer-link click could not be trusted because Chrome's accessibility target selected a different route. |
| 1440 × 900 (Responsive mode) | Student dashboard rendered and screenshot-inspected; desktop sidebar and dashboard grid visible. Captured before the tablet breakpoint fix (desktop breakpoint remains unchanged). |
| 375 × 667 (iPhone SE emulation) | Login rendered and visually inspected; initial W-01 reproduction. Demo button worked once before changes. |
| 360 × 800 (Galaxy A55 emulation) | Home rendered and first viewport screenshot inspected. |
| narrower than 360 | Not tested. |
| Other declared web routes | Source-inspected only. `/student/saved` was also displayed after an unreliable click and is not counted as an interaction pass. |
| Login form submit, registration, logout, directory filters, mentorship mutations, message send/read, career/event/admin mutations | Untested. No non-demo mutations submitted. |
| Local student demo login | **MOCKED** — client local state and protected route navigation were verified once. Does not prove API or DB persistence. |
| Student mobile drawer open | **WORKING** — drawer opened and displayed role navigation at 390 CSS px; specific destination click was not reliably verified by browser automation. |
| Public home route navigation | Links rendered; no navigation links clicked during first viewport review. |
| API/database | **BLOCKED / not exercised** — this audit ran the web preview, not API/database. See Stage 4A database limitation. |
| Native Android/iOS | **BLOCKED** — `adb` unavailable and no emulator/device provided. Source code cannot establish safe-area, keyboard or navigation-bar behavior at runtime. |
| Browser console/network | Not inspected. A later inconsistent browser snapshot showed a registration error state; it may have predated this audit and is not treated as an attempted request or verified test result. |

### Source-level interaction classifications

- Auth demo account buttons: **MOCKED** (client-local demo user and route; demo action clicked).
- Normal login/signup/profile: **UNTESTED** for runtime; API routes exist for auth/profile, but server and database persistence were not invoked here.
- Directory, mentorship and messaging: **UNTESTED** runtime; API modules exist as recorded in Stage 4A.
- Careers, jobs, events, notifications, trustee verification: **MOCKED / MISSING** backend per Stage 4A; these UI workflows must not be reported as persisted.
- Admin, onboarding, document verification, contact, forgot-password actions: **UNTESTED**; Stage 4A reports no matching complete backend workflows for trustee verification/password recovery/contact intake.

## 6. Design tokens and native safety source review

Web Tailwind defines blue `#3157D5` accent, ink `#171717`, warm page `#F8F8F5`, border `#D8D8D2`, subtle shadows and radii capped at 8px. Mobile's tokenized lime accent is a separate platform treatment; runtime comparison was unavailable, so palette changes are deferred. `index.css` includes reduced-motion handling. App and mobile layout source have safe-area provider/insets and keyboard-avoidance usage, but native overlap and actual touch target behavior remain unverified on a device.

## 7. Fixes and post-fix verification

W-01 received a route-change scroll reset. W-04 received the tablet breakpoint adjustment in both role shells. W-04 has been visually rechecked in the student shell; W-01 still requires the exact route-transition regression to be repeated in a reliable browser session.

## 8. Checks and remaining blockers

Post-fix commands:

| Command | Result |
|---|---|
| `pnpm --filter @alumnux/web lint` | Passed (exit 0) |
| `pnpm --filter @alumnux/web typecheck` | Passed (exit 0) |
| `pnpm --filter @alumnux/web test` | Passed: 5 files, 32 tests |
| `pnpm --filter @alumnux/web build` | Passed (exit 0); Vite reported the existing ~858 kB minified JS chunk warning (>500 kB) |
| `pnpm --filter @alumnux/mobile typecheck` | Passed (exit 0) |
| `pnpm --filter @alumnux/mobile test` | Passed: 4 files, 35 tests |
| `pnpm typecheck` | Passed: 10 tasks in 11 packages; Turbo used cached outputs where available |
| `git diff --check` | Passed (exit 0) |

W-04 was visually rechecked at the exact target tablet size. W-01's precise scrolled-login-to-demo path remains **not retested after the code change** because browser automation target coordinates and screenshots became inconsistent after viewport resizing. During recovery, accessibility text described Chrome while a screenshot showed another app window; no further UI input was issued. The registration form displayed existing document-selection previews and an error state in that inconsistent snapshot; no document was opened, changed, uploaded, or resubmitted, and that state is not counted as audit test evidence. Native-device checks remain blocked unless Android Platform Tools/emulator or an iOS device becomes available.

Manual continuation instructions:

1. Start XAMPP/MySQL and API separately only when runtime persistence is explicitly being verified with a designated test database/account; do not treat the current demo dashboard as persisted.
2. Install/enable Android Platform Tools and boot an emulator (or attach a supported physical device) before Android safe-area/keyboard testing; iOS simulator requires a supported macOS host.
3. In Chrome DevTools responsive mode set 768 × 1024 and 390 × 844; inspect `/`, `/login`, `/register`, `/directory`, and authenticated role pages, plus full-page scroll and browser console/network.
4. Use only designated test accounts and disposable records for real API mutation checks.
