export function compareAddresses(
  address1: string | null,
  address2: string | null
) {
  if (address1 === null) return address2 === null;
  if (address2 === null) return address1 === null;

  return (
    address1.localeCompare(address2, undefined, { sensitivity: "accent" }) === 0
  );
}
