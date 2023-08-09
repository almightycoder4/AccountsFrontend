import * as yup from "yup"

export const validateACPL = {
  insurer: yup.string().required("Insurer required"),
  policyType: yup.string().required("Policy type required"),
  bodyType: yup.string().required("Body type required"),
  model: yup.string().required("Model type required"),
  variant: yup.string().required("Variant required"),
  rto: yup.string().required("RTO required"),
  oemId: yup.string().required("OEM Id required"),
  fuelType: yup.string().required("Fuel Type required"),
  //! acpl type
  acplType: yup.string().required("Acpl required"),

  //! acpl custom
  tppd: yup.string().when("acplType", {
    is: "custom",
    then: yup
      .string()
      .required("TPPD required")
      .max(5, "too high")
      .matches(/^\d*[1-9]\d*$/, "invalid number")
  }),

  nildep: yup.string().when("acplType", {
    is: "custom",
    then: yup
      .string()
      .required("nildep required")
      .max(5, "too high")
      .matches(/^\d*[1-9]\d*$/, "invalid number")
  }),

  cpa: yup.string().when("acplType", {
    is: "custom",
    then: yup
      .string()
      .required("cpa required")
      .max(5, "too high")
      .matches(/^\d*[1-9]\d*$/, "invalid number")
  }),
  // discountType: yup.string().when("acplType", {
  //   is: "custom",
  //   then: yup.string().required("Type required").max(1, "single letter")
  // }),
  discount: yup.string().when("acplType", {
    is: "custom",
    then: yup
      .string()
      .required("Discount value required")
      .max(5, "too high")
      .matches(/^\d*[1-9]\d*$/, "invalid number")
  }),
  //! acpl percentage
  percentage: yup.string().when("acplType", {
    is: "percentage",
    then: yup
      .string()
      .required("Percentage required")
      .max(6, "too high")
      .matches(/\b([0-9]|[1-9][0-9]|100)(\.[0-9]+)?\b/, "invalid percents")
  }),
  //! acpl fixed
  fixed: yup.string().when("acplType", {
    is: "fixed",
    then: yup
      .string()
      .required("Fixed amount required")
      .max(5, "too high")
      .matches(/^\d*[1-9]\d*$/, "invalid number")
  })
}
