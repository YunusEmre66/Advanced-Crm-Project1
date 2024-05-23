import Menu from "@/components/menu";
// import { AppDispatch, RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "@/store/apps/tasks";
import FormTask from "@/components/form-task";
import { useGetTasksQuery } from "@/services/task";
import { task } from "@/configs/task";

const NewMeeting = () => {
  const { data: tasks, error, isLoading } = useGetTasksQuery(task.allTask);

  // ** Redux **
  // const dispatch = useDispatch<AppDispatch>();

  // ** Selector **
  // const tasks: any[] = useSelector((state: RootState) => state.tasks.data);

  // ** State **
  const [defaultValues, setDefaultValues] = useState({
    id: 0,
    type: {
      id: 0,
      name: "",
    },
    title: "",
    description: "",
    status: {
      id: 1,
      name: "appointed",
    },
    user: {
      id: "",
      name: "",
    },
    responsible: {
      id: "",
      name: "",
    },
  });

  // useEffect(() => {
  //   dispatch(getTasks());
  // }, [dispatch]);

  function handleEdit(task: any) {
    console.log("handleEdit >> ", task);

    setDefaultValues({
      id: task.id,
      type: {
        id: 0,
        name: task.type,
      },
      title: task.title,
      description: task.description,
      status: {
        id: 1,
        name: task.status,
      },
      user: task.user,
      responsible: task.responsible,
    });
  }

  return (
    <>
      <Menu />
      <div className="container mx-4">
        <FormTask data={defaultValues} id={defaultValues.id} key={1} />
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
            <tr>
                    <th>title</th>
                    <th>description</th>
                    <th>type</th>
                    <th>status</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Edit</th>
                  </tr>
            </thead>
            <tbody>
              {tasks?.data.map((task: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.type}</td>
                    <td>{task.status}</td>
                    <td>
                      {task.user?.firstName} {task.user?.lastName}
                    </td>
                    <td>
                      {task.responsible?.firstName} {task.responsible?.lastName}
                    </td>
                    <td>
                      <button onClick={() => handleEdit(task)}>Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* <select className="text-black">
        <option>Seçiniz</option>
        {users.map((item: any) => {
          return (
            <>
              <option key={item.email}>{item.firstName}</option>
            </>
          );
        })}
      </select>
      <select className="text-black">
        <option>Seçiniz</option>
        {Object.values(enumsData.task).map((item: string) => {
          return (
            <>
              <option key={item}>{item}</option>
            </>
          );
        })}
      </select>
      <select className="text-black">
        <option>Seçiniz</option>
        {Object.values(enumsData.taskStatus).map((item: string) => {
          return (
            <>
              <option key={item}>{item}</option>
            </>
          );
        })}
      </select> */}
    </>
  );
};

export default NewMeeting;
