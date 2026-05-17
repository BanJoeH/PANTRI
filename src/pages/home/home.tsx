import * as React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useHistory, useParams } from "react-router-dom";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppSelector } from "../../App/hooks";
import Recipes from "../recipes/recipes.component";
import ShoppingList from "../shopping-list/shopping-list.component";

import "swiper/css";
import "./home.styles.scss";

function HomeSlide({
  active,
  children,
  swiperRef,
}: {
  active: boolean;
  children: React.ReactNode;
  swiperRef: React.MutableRefObject<SwiperClass | null>;
}): JSX.Element {
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!active) return undefined;

    const updateHeight = () => {
      swiperRef.current?.update();
      swiperRef.current?.updateAutoHeight(0);
    };

    updateHeight();
    const animationFrame = window.requestAnimationFrame(updateHeight);

    const content = contentRef.current;
    if (!content || typeof ResizeObserver === "undefined") {
      return () => window.cancelAnimationFrame(animationFrame);
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(content);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [active, swiperRef]);

  return (
    <div className="home-slide-content" ref={contentRef}>
      {children}
    </div>
  );
}

export default function Home(): JSX.Element {
  const history = useHistory();
  const { tab } = useParams<{ tab?: string }>();
  const uid = useAppSelector((state) => state.firebase.auth.uid);
  const firestoreStatus = useAppSelector((state) => state.firestore.status);
  const swiperRef = React.useRef<SwiperClass | null>(null);
  const activeIndex = tab === "recipes" ? 1 : 0;

  useFirestoreConnect(
    uid
      ? [
          {
            collection: `users/${uid}/shoppingList`,
            storeAs: "shoppingList",
          },
          {
            collection: `users/${uid}/recipes`,
            storeAs: "recipes",
          },
        ]
      : [],
  );

  React.useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== activeIndex) {
      swiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeIndex]);

  const onSlideChange = (swiper: SwiperClass) => {
    const nextTab = swiper.activeIndex === 0 ? "shopping-list" : "recipes";
    if (nextTab !== tab) {
      window.scrollTo({ top: 0 });
      history.push(`/home/${nextTab}`);
    }
  };

  const isPreloading =
    !firestoreStatus.requested.shoppingList ||
    !firestoreStatus.requested.recipes ||
    firestoreStatus.requesting.shoppingList ||
    firestoreStatus.requesting.recipes;

  if (isPreloading) {
    return <div>...loading</div>;
  }

  return (
    <Swiper
      autoHeight
      className="home-swiper"
      initialSlide={activeIndex}
      onSlideChange={onSlideChange}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      slidesPerView={1}
    >
      <SwiperSlide>
        <HomeSlide active={activeIndex === 0} swiperRef={swiperRef}>
          <ShoppingList />
        </HomeSlide>
      </SwiperSlide>
      <SwiperSlide>
        <HomeSlide active={activeIndex === 1} swiperRef={swiperRef}>
          <Recipes />
        </HomeSlide>
      </SwiperSlide>
    </Swiper>
  );
}
