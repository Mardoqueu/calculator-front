/**
 * Represents the properties of a historical operation record.
 *
 * @interface HistoryOperationProps
 *
 * @property {number} id - A unique identifier for the operation.
 * @property {string} operationResponse - A string detailing the outcome or response of the operation.
 * @property {Date} date - The date and time when the operation took place.
 * @property {number} amount - The numerical value associated with the operation, possibly representing a transaction amount.
 */
export interface HistoryOperationProps {
  id: number;
  operationResponse: string;
  date: Date;
  amount: number;
}