import React from "react";
import { DotSpinner, RaceBy } from "@uiball/loaders";


export const Loader = () => {
  return (
    <div className="container-loader">
      {/* <DotSpinner size={40} speed={0.9} color="black" /> */}

      <RaceBy size={40} lineWeight={5} speed={0.9} color="black" />
    </div>
  );
};
