import React from "react";

import { Link, useHistory } from "react-router-dom";

// Стили
import notFoundPageStyles from "./NotFoundPage.module.css";
// Стили

function NotFoundPage() {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <section className={notFoundPageStyles.not_found}>
      <p
        className={`${notFoundPageStyles.error} text text_type_digits-large mb-25`}
      >
        404
      </p>
      <h2
        className={`${notFoundPageStyles.title} text text_type_main-medium mb-10`}
      >
        Страница не найдена :(
      </h2>
      <button
        onClick={handleGoBack}
        className={`text text_type_main-medium ${notFoundPageStyles.go_back}`}
      >
        Назад
      </button>
    </section>
  );
}

export default NotFoundPage;
