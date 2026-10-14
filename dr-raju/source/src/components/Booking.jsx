import { useEffect, useMemo, useRef, useState } from "react";
import Section from "./Section";
import { BOOKING, LINKS } from "../data/content";
import { useLang } from "../i18n/LanguageProvider";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Local midnight today â€” the boundary for "past date". */
function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function ymd(d) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export default function Booking() {
  const { t, lang } = useLang();
  const today = useMemo(startOfToday, []);

  const [viewMonth, setViewMonth] = useState(() =>
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef(null);
  const errorRef = useRef(null);
  const dateFieldRef = useRef(null);
  const timeFieldRef = useRef(null);

  // Booking horizon: three months out keeps the picker honest.
  const horizon = useMemo(
    () => new Date(today.getFullYear(), today.getMonth() + 3, 1),
    [today]
  );

  const monthLabel = useMemo(
    () =>
      viewMonth.toLocaleDateString(lang === "en" ? "en-GB" : lang, {
        month: "long",
        year: "numeric",
      }),
    [viewMonth, lang]
  );

  const weekdays = useMemo(
    () =>
      WEEKDAYS.map((d, i) =>
        lang === "en"
          ? d
          : new Date(2024, 0, 7 + i).toLocaleDateString(lang, { weekday: "short" })
      ),
    [lang]
  );

  const days = useMemo(() => {
    const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const lead = first.getDay();
    const count = new Date(
      viewMonth.getFullYear(),
      viewMonth.getMonth() + 1,
      0
    ).getDate();

    const cells = [];
    for (let i = 0; i < lead; i++) cells.push(null);
    for (let d = 1; d <= count; d++) {
      const dt = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d);
      const isPast = dt < today;
      const isBeyond = dt >= new Date(horizon.getFullYear(), horizon.getMonth(), 1);
      cells.push({ date: dt, disabled: isPast || isBeyond });
    }
    return cells;
  }, [viewMonth, today, horizon]);

  const canPrev = useMemo(
    () =>
      viewMonth.getFullYear() > today.getFullYear() ||
      viewMonth.getMonth() > today.getMonth(),
    [viewMonth, today]
  );

  // Clearing an error as soon as the field becomes valid keeps the form from
  // scolding a user who has already fixed it.
  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const next = {};
    if (!date) next.date = true;
    if (!time) next.time = true;
    if (!values.name.trim()) next.name = true;
    if (!EMAIL_RE.test(values.email.trim())) next.email = true;
    return next;
  };

  /**
   * The old build's submit button was a silent dead end when no date was
   * chosen: no error, no focus move, nothing happened. This reports every
   * problem, announces them, and moves focus to the first thing to fix.
   */
  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    setSubmitted(true);

    const order = ["date", "time", "name", "email"];
    const firstBad = order.find((k) => found[k]);
    if (firstBad) {
      const target =
        firstBad === "date"
          ? dateFieldRef.current
          : firstBad === "time"
            ? timeFieldRef.current
            : formRef.current?.querySelector(`[name="${firstBad}"]`);
      target?.focus();
      return;
    }

    const pretty = date.toLocaleDateString(lang === "en" ? "en-GB" : lang, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const subject = `Meeting request â€” ${pretty} at ${time} IST`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Preferred date: ${pretty}`,
      `Preferred time: ${time} IST (UTC+05:30)`,
      "",
      values.message.trim() ? `Message:\n${values.message.trim()}` : "",
      "",
      "Sent from dr-gundala-nagaraju.vercel.app",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:raju.r3spai@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Section id="booking" title={BOOKING.heading}>
      <p className="lead">{t(BOOKING.note)}</p>

      {submitted && hasErrors ? (
        <div className="alert" role="alert" ref={errorRef} tabIndex={-1}>
          <p className="alert-title">{t("Please complete the highlighted fields:")}</p>
          <ul>
            {!date && <li>{t("Choose a preferred date to continue.")}</li>}
            {!time && <li>{t("Choose a preferred time to continue.")}</li>}
            {!values.name.trim() && <li>{t("Enter your name.")}</li>}
            {!EMAIL_RE.test(values.email.trim()) && (
              <li>{t("Enter a valid email address.")}</li>
            )}
          </ul>
        </div>
      ) : null}

      <form className="booking-form" onSubmit={onSubmit} ref={formRef} noValidate>
        <div className="booking-grid">
          {/* Calendar */}
          <div className="booking-calendar">
            <div className="field">
              <span className="field-label" id="date-label">
                {t(BOOKING.dateLabel)}
              </span>
              <div
                className="calendar"
                role="group"
                aria-labelledby="date-label"
                aria-describedby={errors.date ? "date-error" : undefined}
                aria-invalid={errors.date ? "true" : undefined}
              >
                <div className="calendar-head">
                  <button
                    type="button"
                    className="calendar-nav"
                    onClick={() =>
                      setViewMonth(
                        (m) => new Date(m.getFullYear(), m.getMonth() - 1, 1)
                      )
                    }
                    disabled={!canPrev}
                  >
                    <span aria-hidden="true">â€¹</span>
                    <span className="sr-only">{t("Previous month")}</span>
                  </button>
                  <p className="calendar-month" aria-live="polite">
                    {monthLabel}
                  </p>
                  <button
                    type="button"
                    className="calendar-nav"
                    onClick={() =>
                      setViewMonth(
                        (m) => new Date(m.getFullYear(), m.getMonth() + 1, 1)
                      )
                    }
                    disabled={
                      viewMonth.getFullYear() === horizon.getFullYear() &&
                      viewMonth.getMonth() === horizon.getMonth()
                    }
                  >
                    <span aria-hidden="true">â€º</span>
                    <span className="sr-only">{t("Next month")}</span>
                  </button>
                </div>

                <div className="calendar-grid" aria-hidden="true">
                  {weekdays.map((w) => (
                    <span className="calendar-weekday" key={w}>
                      {w}
                    </span>
                  ))}
                </div>

                <div className="calendar-grid">
                  {days.map((cell, i) =>
                    cell ? (
                      <button
                        key={ymd(cell.date)}
                        type="button"
                        className="calendar-day"
                        disabled={cell.disabled}
                        aria-pressed={date ? sameDay(date, cell.date) : false}
                        aria-label={`Choose ${ymd(cell.date)}`}
                        onClick={() => {
                          setDate(cell.date);
                          setErrors((x) => ({ ...x, date: false }));
                        }}
                        ref={i === 0 ? dateFieldRef : undefined}
                      >
                        {cell.date.getDate()}
                      </button>
                    ) : (
                      <span className="calendar-blank" key={`b-${i}`} />
                    )
                  )}
                </div>
              </div>
              {errors.date ? (
                <p className="field-error" id="date-error">
                  Choose a date to continue.
                </p>
              ) : null}
            </div>

            {/* Times */}
            <div className="field">
              <span className="field-label" id="time-label">
                {t(BOOKING.timeLabel)}
              </span>
              <div
                className="time-slots"
                role="group"
                aria-labelledby="time-label"
                ref={timeFieldRef}
                tabIndex={-1}
                aria-describedby={errors.time ? "time-error" : undefined}
              >
                {BOOKING.slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className="time-slot"
                    aria-pressed={time === slot}
                    onClick={() => {
                      setTime(slot);
                      setErrors((x) => ({ ...x, time: false }));
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.time ? (
                <p className="field-error" id="time-error">
                  Choose a time to continue.
                </p>
              ) : null}
            </div>
          </div>

          {/* Details */}
          <div className="booking-details">
            <div className="field">
              <label className="field-label" htmlFor="bk-name">
                {t(BOOKING.fields.name)}
              </label>
              <input
                id="bk-name"
                name="name"
                type="text"
                className="input"
                autoComplete="name"
                value={values.name}
                onChange={(e) => setField("name", e.target.value)}
                aria-invalid={errors.name ? "true" : undefined}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name ? (
                <p className="field-error" id="name-error">
                  Enter your name.
                </p>
              ) : null}
            </div>

            <div className="field">
              <label className="field-label" htmlFor="bk-email">
                {t(BOOKING.fields.email)}
              </label>
              <input
                id="bk-email"
                name="email"
                type="email"
                className="input"
                autoComplete="email"
                inputMode="email"
                value={values.email}
                onChange={(e) => setField("email", e.target.value)}
                aria-invalid={errors.email ? "true" : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email ? (
                <p className="field-error" id="email-error">
                  Enter a valid email address.
                </p>
              ) : null}
            </div>

            <div className="field">
              <label className="field-label" htmlFor="bk-message">
                {t(BOOKING.fields.message)}
              </label>
              <textarea
                id="bk-message"
                name="message"
                className="input input-area"
                rows={4}
                value={values.message}
                onChange={(e) => setField("message", e.target.value)}
              />
            </div>

            <p className="fine-print">{t(BOOKING.consent)}</p>

            <button type="submit" className="btn btn-solid btn-block">
              {t(BOOKING.submit)}
              <span className="btn-arrow" aria-hidden="true">
                â†—
              </span>
            </button>
          </div>
        </div>
      </form>
    </Section>
  );
}