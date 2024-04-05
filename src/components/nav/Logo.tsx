import * as React from "react";

export interface ILogoProps {
  className?: string;
}

export default function Logo(props: ILogoProps) {
  const { className } = props;
  return (
    <div className={className}>
      <h6 className="font-bold pointer-events-none text-white">
        <span className="  mr-1">{`Ted's`}</span>
        Reminder
      </h6>
    </div>
  );
}
