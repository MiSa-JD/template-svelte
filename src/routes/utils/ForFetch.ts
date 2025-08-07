export const needHeader = (method: string): boolean => {
  let res = true
  switch (method) {
    case "GET":
    case "HEAD":
    case "OPTIONS":
      res = false
  }

  return res
}