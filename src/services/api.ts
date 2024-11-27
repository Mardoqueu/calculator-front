import { UserProps } from "../interfaces/UserProps";
import { toast } from "react-toastify";

const API_URL = "https://gateway-api-d8a0222e1f5e.herokuapp.com";

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
