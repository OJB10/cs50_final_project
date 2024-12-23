import React from "react";
import PenIcon from "../assets/images/taskcard/pen_dark.svg";
import TimerIcon from "../assets/images/taskcard/timer_dark.svg";
import TrashIcon from "../assets/images/taskcard/trash_dark.svg";
import CalendarIcon from "../assets/images/taskcard/calendar_days_light.svg";

const TaskCard = ({ name, description, status, dueDate }) => {
  return (
    <div className="bg-secondary" style={{ padding: "16px", borderRadius: "16px", border: "1px var(--border-color) solid", display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Status and Actions */}
      <div className="flex-row justify-between align-center">
        <div className="flex-row align-center">
          <div className="bg-primary" style={{ width: "24px", height: "24px", borderRadius: "50%" }}></div>
        </div>
        <div className="bg-accent flex-row align-center" style={{ padding: "4px 16px", borderRadius: "16px", gap: "8px" }}>
          <span className="text-small">{status}</span>
        </div>
      </div>

      {/* Task Title */}
      <div className="body-large text-primary">{name}</div>

      {/* Task Description */}
      <div className="body-default text-primary">{description}</div>

      {/* Due Date and Actions */}
      <div className="flex-row justify-between align-center">
        <div className="flex-row align-center gap-8">
          <img src={CalendarIcon} alt="Calendar" style={{ width: "16px", height: "16px" }} />
          <span className="text-small text-secondary">{dueDate}</span>
        </div>
        <div className="flex-row align-center gap-8">
          <img src={PenIcon} alt="Edit" style={{ width: "16px", height: "16px" }} />
          <img src={TrashIcon} alt="Delete" style={{ width: "16px", height: "16px" }} />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;