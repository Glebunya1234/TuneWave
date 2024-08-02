"use server"; // Укажите, что это клиентский компонент

import { createClient } from "@/utils/supabase/server";

export const Dddassaa = async () => {
  const fetchSession = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    console.log(data);
    if (!data) {
      console.error("Токен обновления отсутствует");
      // Обработайте это состояние, возможно, перенаправив пользователя на повторную аутентификацию
    }
  };

  fetchSession();

  return (
    <div>
      {" "}
      <p>Сессия загружена</p> : <p>Загрузка...</p>{" "}
    </div>
  );
};
