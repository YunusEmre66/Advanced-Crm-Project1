import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/store';
import { Controller, useForm } from "react-hook-form";
import Input from "./input";
import { useSetUserMutation } from "@/services/user";
import { useGetContactEnumQuery } from "@/services/enums";
import ReactSelect from "react-select";
import { useGetCountryQuery } from "@/services/country";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  emailType?: string;
  phone?: string;
  phoneType?: string;
  addressType?: string;
  addressLine?: string;
  location?: string;
  country?: string;
  city?: string;
  district?: string;
  town?: string;
};

const loginFormSchema = yup.object().shape({
  firstName: yup.string().required("Lütfen adınızı giriniz"),
  lastName: yup.string().required("Lütfen soyadınız giriniz"),
  email: yup.string().required("Lütfen email giriniz"),
});

const defaultValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  emailType: "",
  phone: "",
  phoneType: "",
  addressType: "",
  addressLine: "",
  location: "",
  country: "",
  city: "",
  district: "",
  town: "",
};

const AddCustomer = () => {
  const { data: contact } = useGetContactEnumQuery("/enum/contact");
  const { data: countries } = useGetCountryQuery("/country");

  const [setUser] = useSetUserMutation();
  // ** State
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [district, setDistrict] = useState([])
  const [town, setTown] = useState([])

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = (payload: any) => {
    const sendPayload = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      emailType: payload.emailType.id,
      phone: payload.phone,
      phoneType: payload.phoneType.id,
      addressType: payload.addressType.id,
      addressLine: payload.addressLine,
      location: payload.location,
      country: payload.country.id,
      city: payload.city.id,
      district: payload.district.id,
      town: payload.town.id
    } as FormValues
    
    setLoading(true);
    
    setUser(sendPayload)
      .unwrap()
      .then(() => {
        console.log("User added");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Failed to add user");
        setLoading(false);
      });
    reset(defaultValues);
  };

  return (
    <>
      <main className="container mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-y-2">
            <div className="w-full md:w-1/3 px-1">
              <Input
                type="text"
                placeholder="First Name"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && <>{errors.firstName.message}</>}
            </div>
            <div className="w-full md:w-1/3 px-1">
              <Input
                type="text"
                placeholder="Last Name"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && <>{errors.lastName.message}</>}
            </div>
            <div className="w-full md:w-1/3 px-1">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2">
                  <Controller
                    name={"emailType"}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <ReactSelect
                          className="pt-1.5 text-black"
                          value={value}
                          onBlur={onBlur}
                          onChange={(e: any) => {
                            onChange(e);
                          }}
                          options={[...(contact?.data ?? [])]}
                          placeholder={"Email Type"}
                          getOptionLabel={(option: any) => option.name}
                          getOptionValue={(option: any) => option.id}
                        />
                      );
                    }}
                  />
                  {errors.emailType && <>{errors.emailType.message}</>}
                </div>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    placeholder="Email"
                    className="mt-1"
                    rounded="rounded-2xl"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <>{errors.email.message}</>}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-1">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2">
                  <Controller
                    name={"phoneType"}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <ReactSelect
                          className="pt-1.5 text-black"
                          value={value}
                          onBlur={onBlur}
                          onChange={(e: any) => {
                            onChange(e);
                          }}
                          options={[...(contact?.data ?? [])]}
                          placeholder={"Phone Type"}
                          getOptionLabel={(option: any) => option.name}
                          getOptionValue={(option: any) => option.id}
                        />
                      );
                    }}
                  />
                  {errors.phoneType && <>{errors.phoneType.message}</>}
                </div>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    placeholder="Phone"
                    className="mt-1"
                    rounded="rounded-2xl"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && <>{errors.phone.message}</>}
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 px-1">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/4">
                  <Controller
                    name={"addressType"}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <ReactSelect
                          className="pt-1.5 text-black"
                          value={value}
                          onBlur={onBlur}
                          onChange={(e: any) => {
                            onChange(e);
                          }}
                          options={[...(contact?.data ?? [])]}
                          placeholder={"Adress Type"}
                          getOptionLabel={(option: any) => option.name}
                          getOptionValue={(option: any) => option.id}
                        />
                      );
                    }}
                  />
                  {errors.addressType && <>{errors.addressType.message}</>}
                </div>
                <div className="w-full md:w-3/4">
                  <Input
                    type="text"
                    placeholder="Adress Line"
                    className="mt-1"
                    rounded="rounded-2xl"
                    {...register("addressLine", { required: true })}
                  />
                  {errors.addressLine && <>{errors.addressLine.message}</>}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/5 px-1">
              <Input
                type="text"
                placeholder="location"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("location", { required: true })}
              />
              {errors.location && <>{errors.location.message}</>}
            </div>
            <div className="w-full md:w-1/5">
              <Controller
                name={"country"}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <ReactSelect
                      className="pt-1.5 text-black"
                      value={value}
                      onBlur={onBlur}
                      onChange={(e: any) => {
                        setCities(e.city);
                        onChange(e);
                      }}
                      options={[...(countries ?? [])]}
                      placeholder={"Country"}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                    />
                  );
                }}
              />
              {errors.country && <>{errors.country.message}</>}
            </div>
            <div className="w-full md:w-1/5">
              <Controller
                name={"city"}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <ReactSelect
                      className="pt-1.5 text-black"
                      value={value}
                      onBlur={onBlur}
                      onChange={(e: any) => {
                        setDistrict(e.district)
                        onChange(e);
                      }}
                      options={[...(cities ?? [])]}
                      placeholder={"City"}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                    />
                  );
                }}
              />
              {errors.city && <>{errors.city.message}</>}
            </div>
            <div className="w-full md:w-1/5">
              <Controller
                name={"district"}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <ReactSelect
                      className="pt-1.5 text-black"
                      value={value}
                      onBlur={onBlur}
                      onChange={(e: any) => {
                        setTown(e.town)
                        onChange(e);
                      }}
                      options={[...(district ?? [])]}
                      placeholder={"District"}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                    />
                  );
                }}
              />
              {errors.district && <>{errors.district.message}</>}
            </div>
            <div className="w-full md:w-1/5">
              <Controller
                name={"town"}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <ReactSelect
                      className="pt-1.5 text-black"
                      value={value}
                      onBlur={onBlur}
                      onChange={(e: any) => {
                        onChange(e);
                      }}
                      options={[...(town ?? [])]}
                      placeholder={"Town"}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                    />
                  );
                }}
              />
              {errors.town && <>{errors.town.message}</>}
            </div>
            <div className="w-full md:w-1/1 px-5 text-end">
              <button type="submit" disabled={loading}>
                {loading ? "işleminiz yapılıyor" : "Gönder"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default AddCustomer;
