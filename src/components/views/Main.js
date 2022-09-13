import { withStyles } from "@mui/styles";
import styles from "../../resources/styles/views-styles/Main";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import config from "../../config.json";
import TableComponent from "../customs/TableComponent";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Snackbar,
} from "@mui/material";
import Select from "@mui/material/Select";
import { formatDuration } from "../../services/date-formatter";
function Main(props) {
  const { classes } = props;
  const urls = config.urls;
  const [filterBy, setFilterBy] = useState("");
  const [note, setNote] = useState("");
  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState({});
  const [totalCalls, setTotalCalls] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(null);
  const [isOpenAddNotesModal, setIsOpenAddNotesModal] = useState(false);
  const [isSuccessAddingNote, setIsSuccessAddingNote] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(urls.baseURL + urls.calls, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setCalls(res.data.nodes);

        setTotalCalls(res.data.totalCount);
        setHasNextPage(res.data.hasNextPage);
      });
  }, []);
  useEffect(() => {
    if (filterBy !== "" && filterBy === "archived") {
      setFilteredCalls(calls.filter((call) => call.is_archived === true));
    } else if (filterBy !== "" && filterBy !== "archived") {
      setFilteredCalls(calls.filter((call) => call.is_archived === false));
    } else {
      setFilteredCalls(calls);
    }
  }, [filterBy]);

  const handlePaginationChange = (page) => {
    axios
      .get(urls.baseURL + urls.calls + `?offset=${page}&limit=${10}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (filterBy !== "" && filterBy === "archived") {
          setFilteredCalls(
            res.data.nodes.filter((call) => call.is_archived === true)
          );
        } else if (filterBy !== "" && filterBy !== "archived") {
          setFilteredCalls(
            res.data.nodes.filter((call) => call.is_archived === false)
          );
        } else {
          setFilteredCalls(res.data.nodes);
        }
        setTotalCalls(res.data.totalCount);
        setHasNextPage(res.data.hasNextPage);
      });
  };
  const handleAddNote = (selectedID) => {
    setSelectedCall(filteredCalls.filter((call) => call.id === selectedID)[0]);

    setIsOpenAddNotesModal(true);
  };
  const handlePostNote = () => {
    axios
      .post(
        urls.baseURL + urls.calls + `/${selectedCall.id}` + urls.note,
        { content: note },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setIsSuccessAddingNote(true);
        const indexCalls = calls.findIndex((call) => call.id === res.data.id);

        const indexCallsFiltered = filteredCalls.findIndex(
          (call) => call.id === res.data.id
        );

        let newCalls = calls;
        let newFilteredCalls = filteredCalls;
        newCalls[indexCalls] = res.data;
        newFilteredCalls[indexCallsFiltered] = res.data;

        setCalls(newCalls);
        setFilteredCalls(newFilteredCalls);
        setNote("");
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.header}>Turing Technologies Frontend Test</div>
      </div>
      <div className={classes.rowFlex}>
        <div className={classes.filterByText}>Filter By</div>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <Select
            sx={{ color: "#2d5ce7" }}
            disableUnderline
            value={filterBy}
            onChange={(e) => {
              setFilterBy(e.target.value);
            }}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"archived"}>Archived</MenuItem>
            <MenuItem value={"unArchived"}>Un Archived</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className={classes.row}>
        <TableComponent
          calls={filteredCalls}
          totalCalls={totalCalls}
          hasNextPage={hasNextPage}
          handlePaginationChange={handlePaginationChange}
          handleAddNote={handleAddNote}
        />
      </div>
      <Dialog open={isOpenAddNotesModal}>
        <DialogTitle>
          <>
            <div>Add Notes</div>
            <div className={classes.blueText}>Call ID {selectedCall.id}</div>
          </>
        </DialogTitle>
        <DialogContent>
          <>
            <div className={classes.dialogRow}>
              <div>Call Type</div>
              <div>{selectedCall.call_type}</div>
            </div>
            <div className={classes.dialogRow}>
              <div>Duration</div>
              <div>{formatDuration(selectedCall.duration)}</div>
            </div>
            <div className={classes.dialogRow}>
              {" "}
              <div>From</div>
              <div>{selectedCall.from}</div>
            </div>
            <div className={classes.dialogRow}>
              <div> To </div>
              <div>{selectedCall.to}</div>
            </div>
            <div className={classes.dialogRow}>
              {" "}
              <div> Via </div>
              <div>{selectedCall.via}</div>
            </div>

            <div className={classes.dialogRow}>Notes</div>

            {selectedCall.notes?.map((note) => {
              return <div className={classes.dialogRow}>{note.content}</div>;
            })}
            {selectedCall.notes?.length === 0 ? (
              <div className={classes.dialogRow}>
                <div className={classes.orangeText}>No Notes</div>
              </div>
            ) : (
              <></>
            )}
            <div className={classes.dialogRow}>
              <textarea
                type={"area"}
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
            </div>
          </>
        </DialogContent>
        <DialogActions>
          <div
            className={classes.extendedBtn}
            onClick={() => {
              setIsOpenAddNotesModal(false);
              handlePostNote();
            }}
          >
            Save
          </div>
          <div
            className={classes.extendedBtn}
            onClick={() => {
              setIsOpenAddNotesModal(false);
            }}
          >
            Close
          </div>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isSuccessAddingNote}
        autoHideDuration={6000}
        onClose={() => {
          setIsSuccessAddingNote(false);
        }}
        message="Posting Notes Success"
        action={() => {
          setIsSuccessAddingNote(false);
        }}
      />
    </div>
  );
}
export default withStyles(styles)(Main);
