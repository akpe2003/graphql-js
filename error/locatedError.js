import inspect from "../jsutils/inspect.js";
import { GraphQLError } from "./GraphQLError.js";
/**
 * Given an arbitrary value, presumably thrown while attempting to execute a
 * GraphQL operation, produce a new GraphQLError aware of the location in the
 * document responsible for the original Error.
 */

export function locatedError(rawOriginalError, nodes, path) {
  // Sometimes a non-error is thrown, wrap it as an Error instance to ensure a consistent Error interface.
  const originalError = rawOriginalError instanceof Error ? rawOriginalError : new Error('Unexpected error value: ' + inspect(rawOriginalError)); // Note: this uses a brand-check to support GraphQL errors originating from other contexts.

  if (Array.isArray(originalError.path)) {
    return originalError;
  }

  return new GraphQLError(originalError.message, originalError.nodes ?? nodes, originalError.source, originalError.positions, path, originalError);
}
