
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt

def initialize_NN(layers):
    weights = []
    biases = []
    num_layers = len(layers)
    for l in range(0,num_layers-1):
        W = xavier_init(size=[layers[l], layers[l+1]])
        #b = tf.stack(tf.zeros([1, layers[l + 1]], dtype=tf.float32))
        b = tf.Variable(tf.zeros([1,layers[l+1]], dtype=tf.float32), dtype=tf.float32)
        weights.append(W)
        biases.append(b)
    return weights, biases


def xavier_init(size):
    in_dim = size[0]
    out_dim = size[1]
    xavier_stddev = np.sqrt(2/(in_dim + out_dim))
    #return tf.stack(tf.truncated_normal([in_dim, out_dim], stddev=xavier_stddev, dtype=tf.float32))
    return tf.Variable(tf.truncated_normal([in_dim, out_dim], stddev=xavier_stddev, dtype=tf.float32), dtype=tf.float32)

def neural_net(X, weights, biases):
    num_layers = len(weights) + 1
    H = X
    for l in range(0,num_layers-2):
        W = weights[l]
        b = biases[l]
        H = tf.sin(tf.add(tf.matmul(H, W), b))
    W = weights[-1]
    b = biases[-1]
    Y = tf.add(tf.matmul(H, W), b)
    return Y


class Prediction:
    def __init__(self, t, u_layers,layers, sd_all, sd_class):
        # tf session
        self.t = t;
        self.sd_all = sd_all;
        self.sd_class = sd_class;
        self.u_layers = u_layers;
        self.layers = layers;

\