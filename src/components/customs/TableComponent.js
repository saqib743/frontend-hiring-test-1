import { withStyles } from "@mui/styles";
import styles from "../../resources/styles/views-styles/Table";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import config from "../../config.json";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { formatDate, formatDuration } from "../../services/date-formatter";
function TableComponent(props) {
  const {
    classes,
    calls,
    totalCalls,
    hasNextPage,
    handlePaginationChange,
    handleAddNote,
  } = props;

  const [skip, setSkip] = useState(1);

  useEffect(() => {
    handlePaginationChange(skip);
  }, [skip]);

  const callTypes = {
    voicemail: "blueText",
    answered: "greenText",
    missed: "redText",
  };
  const archiveStatuses = {
    true: "Archived",
    false: "Unarchive",
  };

  return (
    <div className={classes.container}>
      <Table className={classes.table}>
        <TableHead className={classes.darkRow}>
          <TableRow>
            <TableCell>CALL TYPE</TableCell>
            <TableCell>DIRECTION</TableCell>
            <TableCell>DURATION</TableCell>
            <TableCell>FROM</TableCell>
            <TableCell>TO</TableCell>
            <TableCell>VIA</TableCell>
            <TableCell>CREATED AT</TableCell>
            <TableCell>STATUS</TableCell>
            <TableCell>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {calls.map((call) => {
            return (
              <TableRow>
                {" "}
                <TableCell className={classes.capitalize}>
                  <span className={classes[callTypes[call.call_type]]}>
                    {call.call_type}
                  </span>
                </TableCell>
                <TableCell className={classes.capitalize}>
                  <span className={classes.blueText}> {call.direction}</span>
                </TableCell>
                <TableCell>
                  <div className={classes.durationContainer}>
                    <div>{formatDuration(call.duration)}</div>
                    <div className={classes.blueText}>
                      {"( " + call.duration + " seconds)"}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{call.from}</TableCell>
                <TableCell>{call.to}</TableCell>
                <TableCell>{call.via}</TableCell>
                <TableCell>{formatDate(call.created_at)}</TableCell>
                <TableCell>
                  <div
                    className={
                      call.is_archived ? classes.archived : classes.unArchive
                    }
                  >
                    {archiveStatuses[call.is_archived]}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={classes.btn}
                    onClick={() => {
                      handleAddNote(call.id);
                    }}
                  >
                    Add Note
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className={classes.paginationContainer}>
        {" "}
        <Pagination
          color="primary"
          shape="rounded"
          count={Math.ceil(+totalCalls / 10)}
          onChange={(e, newPage) => {
            setSkip((newPage - 1) * 10);
          }}
        />
      </div>
      <div className={classes.paginationToast}>
        {1 +
          skip +
          " - " +
          (skip + 10 < totalCalls ? skip + 10 : totalCalls) +
          " of " +
          totalCalls}{" "}
        results{" "}
      </div>
    </div>
  );
}
export default withStyles(styles)(TableComponent);
