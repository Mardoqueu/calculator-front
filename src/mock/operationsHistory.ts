/**
 * Represents the history of operations performed, including details
 * about each operation such as its ID, name, date of operation, and cost.
 *
 * @type {Array<{id: number, name: string, dateOperation: Date, cost: number}>}
 *
 * @property {number} id - A unique identifier for the operation.
 * @property {string} name - The name of the operation performed.
 * @property {Date} dateOperation - The date and time when the operation was executed.
 * @property {number} cost - The cost associated with performing the operation.
 */
export const operationsHistory = [
  {
    id: 1,
    name: "subtract",
    dateOperation: new Date(Date.now()),
    cost: 5.00
  },
  {
    id: 2,
    name: "multiply",
    dateOperation: new Date(Date.now()),
    cost: 10.00
  },
  {
    id: 3,
    name: "subtract",
    dateOperation: new Date(Date.now()),
    cost: 5.00
  }
];