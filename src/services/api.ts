import { UserProps } from "../interfaces/UserProps";
import { toast } from "react-toastify";

/**
 * The base URL for the API endpoint.
 *
 * This constant serves as the entry point for all API requests within the application.
 * It is a string representing the root URL of the backend server.
 *
 * Usage of this constant ensures that all network requests target the correct server
 * and helps manage changes to the server address from a single point in the codebase.
 *
 * Be sure to update this URL if the server location changes.
 *
 * Note: This URL should always point to a valid API gateway.
 */
const API_URL = "https://gateway-api-d8a0222e1f5e.herokuapp.com";

/**
 * Sends a request to create a new user with the provided username and password.
 *
 * @param {Object} params - An object containing user details.
 * @param {string} params.userName - The username for the new user.
 * @param {string} params.password - The password for the new user.
 * @return {Promise<void>} A promise that resolves if the user is created successfully, rejects with an error on failure.
 */
export async function createUser({ userName, password }: UserProps) {
  try {
    const user = {
      userName,
      password,
    };

    const optionsRequest = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${API_URL}/auth/register`, optionsRequest);

    if (response.ok) {
      await response.json();
      toast.success("User created successfully!");

      return;
    }

    throw new Error();
  } catch (error) {
    console.log("Error creating a user", error);
    toast.error("Error creating a user");
  }
}

/**
 * Authenticates a user with the provided credentials.
 *
 * @param {Object} userProps - The user credentials.
 * @param {string} userProps.userName - The username of the user.
 * @param {string} userProps.password - The password of the user.
 * @return {Promise<Object|undefined>} A promise that resolves to the user data if the login is successful,
 * or undefined if an error occurs.
 */
export async function login({ userName, password }: UserProps) {
  try {
    const user = {
      userName,
      password,
    };

    const optionsRequest = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${API_URL}/auth/login`, optionsRequest);

    if (response.status === 200 || response.status === 201) {
      return await response.json();
    }

    throw new Error(
      `An error occurred while logging in: ${response.statusText}`
    );
  } catch (error) {
    console.log("An error occurred while logging in", error);
  }
}

/**
 * Sends a request to execute a mathematical operation on behalf of the user.
 *
 * @param {number} userId - The ID of the user performing the operation.
 * @param {string} operation - The mathematical expression to evaluate.
 * @return {Promise<Object|undefined>} The result of the operation if successful, otherwise undefined if an error occurs.
 */
export async function calculateOperation(userId: number, operation: string) {
  try {
    const operations = {
      userId,
      expression: operation,
    };

    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      return toast.error("Unable to get user token");
    }

    const optionsRequest = {
      method: "POST",
      body: JSON.stringify(operations),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await fetch(
      `${API_URL}/operations/execute`,
      optionsRequest
    );

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
  } catch (error) {
    console.log("An error occurred when trying to calculate operation", error);
    toast.error(
      `An error occurred when trying to calculate operation ${error}`
    );
  }
}

/**
 * Generates a random string by making a POST request to a specific API endpoint.
 * Utilizes the user token stored in local storage to authorize the request.
 * Displays a toast error message if the user token cannot be retrieved or if the request fails.
 * Logs errors to the console and displays a toast error message in case of failure.
 * Provides the random string upon successful completion of the request.
 *
 * @return {Promise<string|undefined>} A promise that resolves to the generated random string if successful, or undefined if an error occurs.
 */
export async function generateRandomString() {
  try {
    const userToken = localStorage.getItem("userToken");
    const userId = Number(localStorage.getItem("userId"));

    if (!userToken) {
      toast.error("Unable to get user token");
      return;
    }

    const optionsRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await fetch(
      `${API_URL}/operations/random-string?userId=${userId}`,
      optionsRequest
    );

    if (response.ok) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
  } catch (error) {
    console.log("An error occurred while generating the random string", error);
    toast.error(
      `An error occurred while generating the random string ${error}`
    );
    return;
  }
}

/**
 * Fetches the current balance of the user based on the user token and userId stored in localStorage.
 * Makes an API request to retrieve the balance details and returns the data if the request is successful.
 * Displays error messages using toast notifications if any error occurs during the process.
 *
 * @return {Promise<Object|undefined>} A promise that resolves to an object containing the user's balance information if successful,
 * or undefined if there are errors or issues retrieving the user token or userId.
 */
export async function currentBalance() {
  try {
    const userToken = localStorage.getItem("userToken");
    const userId = Number(localStorage.getItem("userId"));

    if (!userToken) {
      toast.error("Unable to get user token");
      return;
    }

    if (!userId) {
      toast.error("Unable to get userId");
      return;
    }

    const optionsRequest = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await fetch(`${API_URL}/users/balance?userId=${userId}`, optionsRequest);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
  } catch (error) {
    console.log("An error occurred while getting the current balance", error);
    toast.error(
      `An error occurred while getting the current balance ${error}`
    );
    return;
  }
}

/**
 * Retrieves the transaction history for the current user from the server.
 * The function fetches the data using the user's token and ID stored in local storage.
 * Displays error messages if the token or ID is not available, or if an error occurs during the fetch operation.
 *
 * @return {Promise<Object>|undefined} Returns a promise that resolves to the transaction history object if successful,
 * or undefined if an error occurs or necessary user information is missing.
 */
export async function getTransactionHistory() {
  try {
    const userToken = localStorage.getItem("userToken");
    const userId = Number(localStorage.getItem("userId"));

    if (!userToken) {
      toast.error("Unable to get user token");
      return;
    }

    if (!userId) {
      toast.error("Unable to get userId");
      return;
    }

    const optionsRequest = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await fetch(`${API_URL}/operations?userId=${userId}`, optionsRequest);

    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
  } catch (error) {
    console.log("An error occurred while retrieving transaction history", error);
    toast.error(
      `An error occurred while retrieving transaction history ${error}`
    );
    return;
  }
}

/**
 * Deletes an operation from the history based on the provided operation ID.
 *
 * @param {number} operationId - The identifier of the operation to be deleted.
 * @return {Promise<boolean>} A promise that resolves to true if the operation was successfully deleted, or false otherwise.
 */
export async function deleteOperationHistory(operationId: number): Promise<boolean> {
  try {
    const userToken = localStorage.getItem("userToken");
    const userId = Number(localStorage.getItem("userId"));

    if (!userToken) {
      toast.error("Unable to get user token");
      return false;
    }

    if (!userId) {
      toast.error("Unable to get userId");
      return false;
    }

    const optionsRequest = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await fetch(`${API_URL}/operations/${operationId}`, optionsRequest);

    if (response.ok) {
      toast.success('historical restoration operation');

      return true;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred");
    }
  } catch (error) {
    console.log("An error occurred while deleting the operation from history", error);
    toast.error(
      `An error occurred while deleting the operation from history ${error}`
    );
    return false;
  }
}
