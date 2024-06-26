import React, { Fragment, useState } from "react";
import { CommonButton, CommonInputText, CommonSelect } from "../common/ui";

import { Status } from "../../constants/Data/constantsData";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { toast } from "react-toastify";

import { Progress } from "../common/Progress";
import { BiLockAlt } from "react-icons/bi";
import { useCreate, useUpdate } from "../../hooks";
import { API } from "../../api/endpoints";
import {
  Backdrop,
  Box,
  Chip,
  Divider,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import addCouponValidationSchema from "../../validations/control_validations/AddCouponValidation";
import addTimeValidationSchema from "../../validations/service_validations/AddTimeValidation";
import { formatDatewithTime } from "../../utils/CommonFunction";
import usePatch from "../../hooks/usePatch";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(utc);
dayjs.extend(advancedFormat);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "450px",
  bgcolor: "background.paper",
  border: "2px solid #F7FDFF",
  borderRadius: "10px",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
  p: 4,
};
const AddTime = ({ data, refetch, open, onClose }) => {
  const currentDateTimeLocal = dayjs().format("YYYY-MM-DDTHH:mm");
  // Update Mutation ....
  const { mutateAsync: updateMutate, isLoading: updateLoading } = usePatch({
    endpoint: API.UpdateBooking + `/${data?._id}`, // Replace with your actual API endpoint
    onSuccess: (data) => {
      toast.success("Time Update Successfully !");
      refetch();
      onClose();
    },
    onError: (error) => {
      // Handle update error, e.g., display an error message
      toast.error(error?.response?.data?.message);
    },
  });

  // Handle Submit Function .....
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      
      await updateMutate(values);

      setSubmitting(false);
      resetForm();
    } catch (e) {
      setSubmitting(true);
      console.log("Error during Create ", e);
    }
  };

  return (
    <Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={false}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <Formik
                initialValues={{
                  cleaningDate: dayjs(
                    data?.currentBooking?.cleaningDate
                  ).format("YYYY-MM-DDTHH:mm"),
                }}
                validationSchema={addTimeValidationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  handleChange,
                  errors,
                  touched,
                  isSubmitting,
                  resetForm,
                  setFieldValue
                }) => (
                  <Form>
                    {/* <>{JSON.stringify(values)}</> */}
                    <Box
                      sx={{
                        pb: 0,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h5" component="h5">
                        {data ? "Update " : "Add "} Cleaning Time
                      </Typography>
                      <div style={{}}>
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            onClose();
                            resetForm();
                          }}
                        >
                          <AiOutlineCloseCircle
                            sx={{
                              color: "#ff4a68",
                              height: "22px",
                              width: "22px",
                            }}
                            className="text-red-400 hover:text-600"
                          />
                        </IconButton>
                      </div>
                    </Box>
                    <Divider sx={{ mb: 2 }}>
                      <Chip label="Time" />
                    </Divider>

                    <div className="mt-4 pb-3">
                      <div
                       
                      >
                        {/* <Field
                          name="cleaningDate"
                          id="cleaningDate"
                          label="Cleaning Time :"
                          type="datetime-local"
                          // textformat="text"
                          placeholder="Type here"
                          // component={CommonInputText}
                          onChange={handleChange}
                          value={values.cleaningDate}
                          error={touched.cleaningDate && errors.cleaningDate}
                        /> */}
                        <Field
                          id="date-time"
                          type="datetime-local"
                          name="cleaningDate"
                          className={`py-3 px-5 border w-full my-3 rounded-lg${
                            touched.cleaningDate && errors.cleaningDate
                              ? "border-red-500"
                              : ""
                          }`}
                          min={currentDateTimeLocal}
                          value={dayjs(values.cleaningDate).format(
                            "YYYY-MM-DDTHH:mm"
                          )}
                          onChange={(e) => {
                            const localDate = dayjs(e.target.value);
                            const utcDate = localDate
                              .utc()
                              .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
                            setFieldValue("cleaningDate", utcDate);
                          
                          }}
                        />
                        {touched.cleaningDate && errors.cleaningDate && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.cleaningDate}
                          </p>
                        )}
                      </div>
                      <ErrorMessage
                        name="cleaningDate"
                        component="div"
                        className="mt-2 text-sm text-red-600"
                      />
                    </div>

                    <div className="flex  justify-center space-x-5 mt-5">
                      <CommonButton
                        text="reset"
                        type="reset"
                        className="border border-primary hover:bg-gray-100 w-24 flex justify-center items-center"
                        onClick={() => resetForm()}
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-44 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-[#cacc57] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          {updateLoading ? (
                            <Progress />
                          ) : (
                            <BiLockAlt
                              className="h-5 w-5 text-gray-600 group-hover:text-gray-800"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                        {data?._id ? "Update Changes" : "Save Changes"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default AddTime;
