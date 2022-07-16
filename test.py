def findMin(V):
      
    coin = [1, 2, 5, 10, 20, 50, 
            100, 500, 1000]
    n = len(coin)
      
    ans = []
  
    i = n - 1
    while(i >= 0):
          
        while (V >= coin[i]):
            V -= coin[i]
            ans.append(coin[i])
  
        i -= 1
  
    for i in range(len(ans)):
        print(ans[i], end = " ")
  
n = int(input("Value: "))
print("Following is minimal number",
        "of change for", n, ": ", end = "") findMin(n)