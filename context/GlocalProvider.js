import React, { createContext, useContext, useEffect, useState } from "react";


const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext)