import * as React from "react";

export interface ILogoProps {}

export default function Logo(props: ILogoProps) {
  return (
    <div>
      <h6 className="font-bold pointer-events-none">
        <span className="text-blue-300  mr-1">Ted</span>
        Reminder
      </h6>
    </div>
  );
}
