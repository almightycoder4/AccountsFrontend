import * as yup from "yup"

export const validatePayOut = {
  insurer: yup.string().required("Insurer required"),
  policyType: yup.string().required("Policy type required"),
  bodyType: yup.string().required("Body type required"),
  model: yup.string().required("Model type required"),
  variant: yup.string().required("Variant required"),
  rto: yup.string().required("RTO required"),
  oemId: yup.string().required("OEM Id required"),
  fuelType: yup.string().required("Fuel Type required"),
  //! payout type
  payOutType: yup.string().required("Pay-Out required"),

  //! payout percentage
  percentage: yup.string().when("payOutType", {
    is: "percentage",
    then: yup
      .string()
      .required("Percentage required")
      .max(6, "too high")
      .matches(/\b([0-9]|[1-9][0-9]|100)(\.[0-9]+)?\b/, "invalid percents")
  }),
  //! payout fixed
  fixed: yup.string().when("payOutType", {
    is: "fixed",
    then: yup
      .string()
      .required("Fixed amount required")
      .max(5, "too high")
      .matches(/^\d*[1-9]\d*$/, "invalid number")
  })
}
