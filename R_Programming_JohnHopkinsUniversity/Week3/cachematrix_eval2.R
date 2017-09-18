## Put comments here that give an overall description of what your
## This function will cache inverse of a matrix and return cached result
## if called with same matrix again
## functions do

## Write a short comment describing this function
## creates a special matrix that caches inverse.

makeCacheMatrix <- function(x = matrix())
{
  inv <- NULL
  set <- function(y) 
  {
    x <<- y
    inv <<- NULL
  }
  get <- function() x
  setInverse <- function(solve) inv <<- solve
  getInverse <- function() inv
  list(set = set, get = get,
       setInverse = setInverse,
       getInverse = getInverse)
  
}


## Write a short comment describing this function
# Calls getInverse function of special matrix
# If this matrix has been used before and inverse been cached then 
# returns the cached inverse, if not then solve the matrix and stores 
# inverse in the cached matrix and returns inverse

cacheSolve <- function(x, ...) 
{
  inv <- x$getInverse()
  if(!is.null(inv)) 
  {
    message("getting cached data")
    return(inv)
  }
  data <- x$get()
  inv <- solve(data, ...)
  x$setInverse(inv)
  inv
}