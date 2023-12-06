import flwr as fl
import numpy as np
import flwr
# import torch

from flwr.common import (
    Code,
    EvaluateIns,
    EvaluateRes,
    FitIns,
    FitRes,
    GetParametersIns,
    GetParametersRes,
    Status,
    ndarrays_to_parameters,
    parameters_to_ndarrays,
)



class Client(fl.client.NumPyClient):

    def __init__(self, array):
        self.array = array
        print(self.array)

    def set_parameters(self, parameters):
        return parameters

    def get_parameters(self, ins: GetParametersIns) -> GetParametersRes:
        # The get_parameters function lets the server get the client's parameters

        print("get_parameters is called")
        # print(f"[Client {self.cid}] get_parameters")

        # Get parameters as a list of NumPy ndarray's
        ndarrays: np.ndarray = self.array

        # Serialize ndarray's into a Parameters object
        parameters = ndarrays_to_parameters(ndarrays)
        print("parameters: ", parameters)

        # Build and return response
        status = Status(code=Code.OK, message="Success")
        return GetParametersRes(
            status=status,
            parameters=parameters,
        )

    # def fit(self, parameters):
    #     self.array = parameters
    #     fit_res = flwr.common.FitRes(status=flwr.common.Status(
    #             code=flwr.common.Code.EVALUATE_NOT_IMPLEMENTED ,
    #             message="Client does not implement `fit`",
    #         ),
    #         parameters=self.array,
    #         num_examples=len(self.array ),
    #         metrics={})
    #     return fit_res

    def fit(self, ins: FitIns) -> FitRes:
        print("client.fit is called")
        # Deserialize parameters to NumPy ndarray's
        parameters_original = ins.parameters
        self.array = parameters_to_ndarrays(parameters_original)
        print("client.fit -> self.array")
        print(self.array)

        # Update the model parameters using your training logic
        # This is where you should perform the model training with the received parameters

        # Serialize updated ndarray's into a Parameters object
        parameters_updated = ndarrays_to_parameters(self.array)
        print("parameters_updated")
        print(parameters_updated)

        # Build and return response
        status = Status(code=Code.OK, message="Success")  # Change the status code to SUCCESS
        return FitRes(
            status=status,
            parameters=parameters_updated,  # Return the updated model parameters
            num_examples=len(self.array),
            metrics={},
        )

    def aggregated_parameters(self, ins: FitIns) -> FitRes:
        parameters_original = ins.parameters
        self.array = parameters_to_ndarrays(parameters_original)

        # You can print the received parameters here
        print("Received aggregated parameters:")
        print(self.array)

        status = Status(code=Code.OK, message="Success")
        return FitRes(
            status=status,
            parameters=parameters_original,
            num_examples=len(self.array),
            metrics={},
        )

    def evaluate(self, parameters):
        pass


# Create a Flower client
client = Client(array=np.random.randn(2))

# Connect to the server
fl.client.start_client(server_address="127.0.0.1:8080", client=client)

# The server should handle the aggregation logic and return the merged array
# The client can retrieve the merged array from its 'array' attribute
merged_array = client.array
print("merged_array")
print(merged_array)