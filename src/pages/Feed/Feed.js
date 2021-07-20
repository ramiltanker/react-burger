import React from "react";

// Стили
import feedStyles from "./Feed.module.css";
// Стили

// Компоненты
import AppHeader from "../../components/AppHeader/AppHeader";
import FeedCard from "../../components/FeedCard/FeedCard";
// Компоненты

function Feed() {
  return (
    <>
      <AppHeader />
      <section className={feedStyles.feed}>
        <div className={feedStyles.container}>
          <h2 className={feedStyles.title}>Лента заказов</h2>
          <div className={feedStyles.box}>
            <div className={`${feedStyles.orders} mr-15`}>
              <FeedCard />
              <FeedCard />
              <FeedCard />
              <FeedCard />
            </div>
            <div className={feedStyles.statistic}>
              <div className={`${feedStyles.processes} mb-15`}>
                <div className={`${feedStyles.done} mr-9`}>
                  <p className={`${feedStyles.title} mb-6 text text_type_main-default`}>Готовы:</p>
                  <ul className={feedStyles.done_list}>
                    <li
                      className={`${feedStyles.done_li} mb-2 text text_type_digits-default`}
                    >
                      034533
                    </li>
                    <li
                      className={`${feedStyles.done_li} mb-2 text text_type_digits-default`}
                    >
                      034532
                    </li>
                    <li
                      className={`${feedStyles.done_li} mb-2 text text_type_digits-default`}
                    >
                      034530
                    </li>
                    <li
                      className={`${feedStyles.done_li} mb-2 text text_type_digits-default`}
                    >
                      034527
                    </li>
                    <li
                      className={`${feedStyles.done_li} text text_type_digits-default`}
                    >
                      034525
                    </li>
                  </ul>
                </div>
                <div className={feedStyles.in_work}>
                  <p className={`${feedStyles.title} mb-6 text text_type_main-default`}>В работе:</p>
                  <ul className={feedStyles.in_work_list}>
                    <li
                      className={`${feedStyles.in_work_li} mb-2 text text_type_digits-default`}
                    >
                      034538
                    </li>
                    <li
                      className={`${feedStyles.in_work_li} mb-2 text text_type_digits-default`}
                    >
                      034541
                    </li>
                    <li
                      className={`${feedStyles.in_work_li} text text_type_digits-default`}
                    >
                      034542
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`${feedStyles.done_all_time} mb-16`}>
                <p className={`${feedStyles.title} text text_type_main-default`}>Выполнено за все время:</p>
                <p
                  className={`${feedStyles.number} text text_type_digits-large`}
                >
                  28 752
                </p>
              </div>
              <div className={feedStyles.done_today}>
                <p className={`${feedStyles.title} text text_type_main-default`}>Выполнено за сегодня:</p>
                <p
                  className={`${feedStyles.number} text text_type_digits-large`}
                >
                  138
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Feed;
