import React, { useEffect } from "react";
import receiversService from "./services/receivers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { set as setReceiver } from "./redux/receiver/Receiver.store";

export default function App() {
  const dispatch = useDispatch();
  const receivers = useSelector<RootState>((state) => state.receivers);

  useEffect(() => {
    async function fetchReceivers() {
      try {
        const response = await receiversService.getReceivers();
        dispatch(setReceiver(response.data));
      } catch (e) {
        console.error("Error when trying to get receivers");
      }
    }

    fetchReceivers();
  }, []);

  return <p>{JSON.stringify(receivers)}</p>;
}
