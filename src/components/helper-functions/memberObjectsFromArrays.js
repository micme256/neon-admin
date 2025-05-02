export const memberObjectsFromArrays = (accountsData) => {
  const data = accountsData;
  if (data?.length) {
    const headers = data.shift();
    return data.map((row) =>
      Object.fromEntries(headers.map((header, index) => [header, row[index]]))
    );
  }
  return [];
};
