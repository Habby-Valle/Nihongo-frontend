import React, { createContext, useCallback, useMemo, useState } from "react"

interface ILateralMenuContext {
  isClose: boolean
  toggleMenu: () => void
}

export const LateralMenuContext = createContext<ILateralMenuContext>({
  isClose: false,
  toggleMenu: () => {},
})

export function LateralMenuProvider(props: React.PropsWithChildren<{}>) {
  const [isClose, setisClose] = useState(false)

  const toggleMenu = useCallback(() => {
    setisClose((prev) => !prev)
  }, [])

  const menulLateralValue = useMemo(
    () => ({
      isClose,
      toggleMenu,
    }),
    [isClose, toggleMenu],
  )

  return <LateralMenuContext.Provider value={menulLateralValue}>{props.children}</LateralMenuContext.Provider>
}
