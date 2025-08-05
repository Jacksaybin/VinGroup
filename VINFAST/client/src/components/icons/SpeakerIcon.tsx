
import * as React from "react";

type Props = {
  color?: string;
};

export default function SpeakerIcon({ color = "#2563eb" }: Props) {
  return React.createElement(
    "svg",
    {
      width: 32,
      height: 32,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    React.createElement("path", { d: "M3 9v6h4l5 5V4L7 9H3z", fill: color }),
    React.createElement("path", { d: "M16.5 12c0-1.77-1-3.29-2.5-4.03v8.06A4.978 4.978 0 0016.5 12z", fill: color }),
    React.createElement("path", { d: "M14 3.23v2.06c3.39.49 6 3.39 6 6.71s-2.61 6.22-6 6.71v2.06c4.01-.51 7-3.86 7-7.77s-2.99-7.26-7-7.77z", fill: color })
  );
}
