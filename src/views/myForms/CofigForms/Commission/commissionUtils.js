import * as yup from "yup"

export const validateCommission = {
  insurer: yup.string().required("Insurer required"),
  policyType: yup.string().required("Policy type required"),
  bodyType: yup.string().required("Body type required"),
  model: yup.string().required("Model type required"),
  variant: yup.string().required("Variant required"),
  rto: yup.string().required("RTO required"),
  oemId: yup.string().required("OEM Id required"),
  fuelType: yup.string().required("Fuel Type required"),
  //! commission type
  commissionType: yup.string().required("Commission required"),

  //! master commissions
  masterCommission: yup
    .string()
    .when("commissionType", {
      is: "percentage",
      then: yup
        .string()
        .required("percentage required")
        .max(6, "too high")
        .matches(/\b([0-9]|[1-9][0-9]|100)(\.[0-9]+)?\b/, "invalid percents")
    })
    .when("commissionType", {
      is: "fixed",
      then: yup
        .string()
        .required("fixed required")
        .max(5, "too high")
        .matches(/^\d*[1-9]\d*$/, "invalid number")
    }),
  //! distributors commissions
  distributorCommission: yup
    .string()
    .when("commissionType", {
      is: "percentage",
      then: yup
        .string()
        .required("percentage required")
        .max(6, "too high")
        .matches(/\b([0-9]|[1-9][0-9]|100)(\.[0-9]+)?\b/, "invalid percents")
    })
    .when("commissionType", {
      is: "fixed",
      then: yup
        .string()
        .required("fixed required")
        .max(5, "too high")
        .matches(/^\d*[1-9]\d*$/, "invalid number")
    })
}
