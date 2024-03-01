import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function BasicTooltip({ onClose }: { onClose: any }) {
  return (
    <Tooltip title="Delete">
      <IconButton>
        <CloseIcon onClick={onClose} color="primary" />
      </IconButton>
    </Tooltip>
  );
}
