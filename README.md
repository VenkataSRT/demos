# TAMBO Restaurant Prototype Update

This is an updated, single-file front-end demo based on the supplied saved TAMBO page.

## Included in this update
- Table availability by date, time and table, with a 90-minute reservation conflict window.
- Reservation validation and staff status changes (Pending, Confirmed, Cancelled).
- Parking capacity, vehicle entry/exit and full/available status.
- Menu add, edit, enable/disable and delete actions.
- Multi-item customer order cart and staff order status updates.
- Table-specific links and QR images for T01–T12; opening `?table=T07` selects table T07 and opens the ordering view.
- Browser localStorage persistence and migration from the previous `tambo_ops_demo_v2` key.

## Run locally
Open `index.html` in a modern browser. QR images are fetched from an online QR image service, so internet access is needed to display the QR graphics. Table links and copy controls are also provided.

## Deploy
For a static Vercel project, place `index.html` at the intended deployment root and deploy it. If integrating into an existing multi-demo repository, first confirm whether the intended route is the repository root or `demos/tambo/`; do not overwrite the portfolio root page without checking the routing layout.

## Prototype limitations
- This is a front-end prototype. Records are stored in the current browser only; they are not shared between staff devices and can be cleared with browser storage.
- Duplicate prevention works only within that browser's stored data. A production system needs a backend/database and server-side reservation conflict checks.
- No live payment, SMS/WhatsApp confirmation, inventory integration, authentication or authorization is included.
- Sample menu items and prices are placeholders and need venue approval.
- The task specifies table QR ordering. Confirm with the client whether product barcode scanning is also required; it is not implemented in this demo.
