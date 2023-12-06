import numpy as np
import flwr as fl
from flwr.server.strategy import Strategy
from typing import List

from flwr.common import (
    Code,
    EvaluateIns,
    EvaluateRes,
    FitIns,
    FitRes,
    GetParametersIns,
    GetParametersRes,
    Status,
    bytes_to_ndarray,
    ndarrays_to_parameters,
    parameters_to_ndarrays,
)


class MergeArraysStrategy(fl.server.strategy.FedAvg):

    # def initialize_parameters(self, client_manager):
    #     self.arrays = []

    # def configure_fit(self, server_round, parameters, client_manager):
    #     pass

    def weighted_average(metrics):
        print("metrics")
        print(metrics)
        return metrics

    def aggregate_fit(self, rnd, results, failures):
        print("aggregate_fit called...")
        self.arrays = []
        for client_id, fit_res in results:
            print("client_id: ", client_id)
            if fit_res.status.code == Code.OK:
                # Check if the FitRes object indicates success
                parameters = fit_res.parameters
                if parameters is not None and parameters.tensors:
                    for tensor_bytes in parameters.tensors:
                        # Deserialize the tensor from the bytes
                        ndarray = bytes_to_ndarray(tensor_bytes)
                        print(ndarray)
                        if ndarray.size > 0:
                            self.arrays.append(ndarray)

        print("self.arrays")
        print(self.arrays)
        if self.arrays:
            merged_array = self.arrays
            self.arrays = []

            # Serialize the merged model parameters into a Parameters object
            merged_parameters = ndarrays_to_parameters(merged_array)

            print("returning to client")
            # Return a FitRes object with the merged model parameters
            return FitRes(

                status=Status(code=Code.OK, message="Success"),
                parameters=merged_parameters,
                num_examples=len(merged_array),  # Use the merged_array's length
                metrics={},

            ), {}
        else:
            print("returning to client from else block")
            # Return some default or empty FitRes object if there are no successful results
            return FitRes(
                status=Status(code=Code.EVALUATE_NOT_IMPLEMENTED, message="No successful results"),
                parameters=None,
                num_examples=0,
                metrics={},

            ), {}

    def configure_evaluate(self, server_round, parameters, client_manager):
        pass

    def evaluate(self, value, parameters):
        pass




# Create a Flower server
strategy = MergeArraysStrategy(min_available_clients=3, min_fit_clients=3)
# client_manager = fl.server.SimpleClientManager()
# server = fl.server.Server(client_manager=client_manager, strategy=strategy)

fl.server.start_server(
    server_address="0.0.0.0:8080",
    config=fl.server.ServerConfig(num_rounds=3),
    strategy=strategy,
)

# # Start the server
# fl.server.start_server(
#     server_address="127.0.0.1:8080",
#     config=fl.server.ServerConfig(num_rounds=1),
#     server=server
# )
