def foo(arr):
    counts = [0,0,0,0,0,0]
    for num in arr:
        counts[num-1] += 1
    print(counts)
    consecutive = False
    num_consecutive = 0
    i = 0
    while i<6:
        if counts[i]>=1:
            consecutive = True
            num_consecutive = 1
            j = i+1
            while j < 6:
                if counts[j] >=1:
                    num_consecutive+= 1
                    j += 1
                else:
                    consecutive = False
                    break
            if num_consecutive>=4:
                print("Consecutive 4")
                if num_consecutive>=5:
                    print("Consecutive 5")
            i = j
        i += 1

def main():
    #foo([1,1,3,4,2]) #1234
    #foo([2,3,2,4,5]) #2345
    #foo([4,5,1,3,6]) #3456
    #foo([1,2,3,4,5]) #12345
    #foo([2,3,4,5,6]) #23456
    foo([4,2,5,1,4])
    foo([6,6,5,5,5])
    
main()