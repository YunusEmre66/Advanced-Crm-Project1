import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./input";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useSetCalenderMutation } from "@/services/calender";
import { useGetTaskQuery } from "@/services/enums";
import { useGetUsersQuery } from "@/services/user";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type FormValues = {
  id?: number | 0;
  calenderType?: any;
  title: string;
  description: string;
  traits?: Object;
  user?: any;
  participants?: any[];
};

const formSchema = yup.object().shape({
  title: yup.string().trim().required("giriniz"),
  description: yup.string().trim().required("giriniz"),
});

const defaultValues: FormValues = {
  id: 0,
  calenderType: "",
  title: "",
  description: "",
  user: {
    id: "",
    name: "",
  },
  participants: []
};

type Props = {
  data?: FormValues;
  id?: number;
};

const FormCalender = ({ data, id }: Props) => {
  const [setCalender] = useSetCalenderMutation();

  const {} = useGetUsersQuery("/users");
  const { data: calender } = useGetTaskQuery("/enum/calender");

  // ** Selector **
  const users = useSelector((state: RootState) => state.usersState.users);

  // ** State **
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: data,
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    console.log(data);
    setValue("id", data?.id ?? 0);

    setValue("title", data?.title ?? "");
    setValue("description", data?.description ?? "");

    setValue(
      "calenderType",
      calender?.data.find((k: any) => k.name === data?.calenderType)
    );
    console.log(data?.user);
    
    setValue("user", data?.user);
    setValue("participants", data?.participants);
  }, [data])
  

  const onSubmit = (payload: FormValues) => {
    console.log("onSubmit payload >> ", payload);

    // const sendPayload = {
    //   id: payload.id,
    //   calenderType: payload.calenderType,
    //   title: payload.title,
    //   description: payload.description,
    //   traits: { key: "value" },
    //   userId: payload.user.id,
    //   participants: payload.participants?.map((k: any) => {
    //     return { id: k.id, name: k.firstName + " " + k.lastName };
    //   }),
    // };
    // console.log("onSubmit sendPayload >> ", sendPayload);

    // setIsSaveLoading(true);

    // setCalender(sendPayload)
    //   .unwrap()
    //   .then(() => {
    //     setIsSaveLoading(false);
    //     reset(defaultValues);
    //   })
    //   .catch(() => {
    //     setIsSaveLoading(false);
    //   });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-y-2">
        <div className="w-full md:w-1/2 px-1">
          <Input
            type="text"
            placeholder="Title"
            className="mt-1"
            rounded="rounded-2xl"
            {...register("title", { required: true })}
          />
          {errors.title && <>{errors.title.message}</>}
        </div>
        <div className="w-full md:w-1/2 px-1">
          <Input
            type="text"
            placeholder="Description"
            className="mt-1"
            rounded="rounded-2xl"
            {...register("description", { required: true })}
          />
          {errors.description && <>{errors.description.message}</>}
        </div>
        <div className="w-full md:w-1/2 px-1">
          <Controller
            name={"calenderType"}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <Select
                  className="text-black"
                  value={value}
                  onBlur={onBlur}
                  onChange={(e: any) => {
                    onChange(e);
                  }}
                  options={[...(calender?.data ?? [])]}
                  placeholder={"Calender Type"}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.id}
                />
              );
            }}
          />
          {errors.calenderType && <>{errors.calenderType.message}</>}
        </div>
        <div className="w-full md:w-1/2 px-1">
          <Controller
            name={"user"}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <Select
                  className="text-black"
                  value={value}
                  onBlur={onBlur}
                  onChange={(e: any) => {
                    onChange(e);
                  }}
                  options={[...users]}
                  placeholder={"Users"}
                  getOptionLabel={(option: any) =>
                    option.firstName + " " + option.lastName
                  }
                  getOptionValue={(option: any) => option.id}
                />
              );
            }}
          />
          {errors.user && <>{errors.user.message}</>}
        </div>
        <div className="w-full md:w-2/2 px-1">
          <Controller
            name={"participants"}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <Select
                  className="text-black"
                  value={value}
                  onBlur={onBlur}
                  isMulti={true}
                  onChange={(e: any) => {
                    onChange(e);
                  }}
                  options={[...users]}
                  placeholder={"Participants"}
                  getOptionLabel={(option: any) =>
                    option.firstName + " " + option.lastName
                  }
                  getOptionValue={(option: any) => option.id}
                />
              );
            }}
          />
          {errors.participants && <>{errors.participants.message}</>}
        </div>
        <div className="w-full md:w-2/2 px-1">
          {isSaveLoading ? (
            <>işleminiz yapılıyor</>
          ) : (
            <>
              <button type="submit">Gönder</button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormCalender;
