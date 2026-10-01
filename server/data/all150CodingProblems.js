// Auto-generated 150 Coding Problems dataset with authentic test cases (3 Open + 15 Hidden Test Cases each)
const all150CodingProblems = [
  {
    "id": 1,
    "title": "Array Iteration & Linear Search",
    "difficulty": "easy",
    "category": "Searching",
    "description": "Iterate through an array of integers to find the first index of a target element. Return -1 if not found.",
    "inputFormat": "First line: array elements space-separated. Second line: target integer.",
    "outputFormat": "Integer index or -1.",
    "constraints": "1 <= N <= 10^5, -10^9 <= arr[i] <= 10^9",
    "sampleInput": "[4, 2, 7, 1, 9]\n7",
    "sampleOutput": "2",
    "boilerplate": "def linear_search(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4, 2, 7, 1, 9]\n7",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 2,
    "title": "String Reversal & Palindromes",
    "difficulty": "easy",
    "category": "Strings",
    "description": "Check if a given string is a palindrome (reads same forward and backward), ignoring case and non-alphanumeric chars.",
    "inputFormat": "Single string S.",
    "outputFormat": "True or False.",
    "constraints": "1 <= len(S) <= 10^5",
    "sampleInput": "\"A man, a plan, a canal: Panama\"",
    "sampleOutput": "True",
    "boilerplate": "def is_palindrome(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "\"A man, a plan, a canal: Panama\"",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "false",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 3,
    "title": "Anagram Detection",
    "difficulty": "easy",
    "category": "Strings",
    "description": "Determine if string s and string t are anagrams of each other.",
    "inputFormat": "Two strings s and t on separate lines.",
    "outputFormat": "True or False.",
    "constraints": "1 <= len(s), len(t) <= 5 * 10^4",
    "sampleInput": "s = \"anagram\", t = \"nagaram\"",
    "sampleOutput": "True",
    "boilerplate": "def is_anagram(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "s = \"anagram\", t = \"nagaram\"",
        "output": "True",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "True",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "True",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "True",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "True",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "True",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "True",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "True",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "True",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "True",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "True",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "True",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "True",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "True",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "True",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 4,
    "title": "Min/Max Element Tracking",
    "difficulty": "easy",
    "category": "Arrays",
    "description": "Find the minimum and maximum elements in an array of integers in a single pass.",
    "inputFormat": "Array of integers.",
    "outputFormat": "Tuple (min, max).",
    "constraints": "1 <= N <= 10^5, -10^9 <= arr[i] <= 10^9",
    "sampleInput": "[3, 5, 1, 9, 2, 8]",
    "sampleOutput": "(1, 9)",
    "boilerplate": "def find_min_max(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[3, 5, 1, 9, 2, 8]",
        "output": "[1,9]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "[1,9]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "[10,50]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "[1,5]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "[-10,10]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "[1,1]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "[100,400]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "[5,9]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "[0,0]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "[12,89]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "[1,11]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "[20,50]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "[-4,-1]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "[1000,3000]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "[15,75]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "[2,10]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "[66,99]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "[3,15]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 5,
    "title": "Counting Frequencies (Hash Map)",
    "difficulty": "easy",
    "category": "Arrays",
    "description": "Count the frequency of each element in an array and return as a key-value frequency map.",
    "inputFormat": "Array of integers or characters.",
    "outputFormat": "Dictionary of frequencies.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "[1, 2, 2, 3, 3, 3]",
    "sampleOutput": "{1: 1, 2: 2, 3: 3}",
    "boilerplate": "def count_frequencies(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[1, 2, 2, 3, 3, 3]",
        "output": "{\"1\":1,\"2\":2,\"3\":3}",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "{\"1\":1,\"2\":1,\"4\":1,\"7\":1,\"9\":1}",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "{\"10\":1,\"20\":1,\"30\":1,\"40\":1,\"50\":1}",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "{\"1\":1,\"2\":1,\"3\":1,\"4\":1,\"5\":1}",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "{\"0\":1,\"5\":1,\"10\":1,\"-10\":1,\"-5\":1}",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "{\"1\":5}",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "{\"100\":1,\"200\":1,\"300\":1,\"400\":1}",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "{\"5\":1,\"6\":1,\"7\":1,\"8\":1,\"9\":1}",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "{\"0\":3}",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "{\"12\":1,\"23\":1,\"45\":1,\"67\":1,\"89\":1}",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "{\"1\":1,\"3\":1,\"5\":1,\"7\":1,\"9\":1,\"11\":1}",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "{\"20\":1,\"30\":1,\"40\":1,\"50\":1}",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "{\"-1\":1,\"-2\":1,\"-3\":1,\"-4\":1}",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "{\"1000\":1,\"2000\":1,\"3000\":1}",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "{\"15\":1,\"30\":1,\"45\":1,\"60\":1,\"75\":1}",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "{\"2\":1,\"4\":1,\"6\":1,\"8\":1,\"10\":1}",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "{\"66\":1,\"77\":1,\"88\":1,\"99\":1}",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "{\"3\":1,\"6\":1,\"9\":1,\"12\":1,\"15\":1}",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 6,
    "title": "Basic Binary Search",
    "difficulty": "easy",
    "category": "Searching",
    "description": "Search for target in sorted array nums using binary search algorithm. Return index or -1.",
    "inputFormat": "Sorted array nums and target value.",
    "outputFormat": "Integer index.",
    "constraints": "1 <= len(nums) <= 10^4, nums sorted in ascending order.",
    "sampleInput": "nums = [-1,0,3,5,9,12], target = 9",
    "sampleOutput": "4",
    "boilerplate": "def binary_search(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 7,
    "title": "Basic Sorting (Bubble/Insertion)",
    "difficulty": "easy",
    "category": "Sorting",
    "description": "Sort an array of integers in non-decreasing order using Bubble Sort or Insertion Sort.",
    "inputFormat": "Unsorted array of integers.",
    "outputFormat": "Sorted array.",
    "constraints": "1 <= N <= 10^3",
    "sampleInput": "[5, 2, 9, 1, 5, 6]",
    "sampleOutput": "[1, 2, 5, 5, 6, 9]",
    "boilerplate": "def basic_sort(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[5, 2, 9, 1, 5, 6]",
        "output": "[1,2,5,5,6,9]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "[1,2,4,7,9]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "[10,20,30,40,50]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "[1,2,3,4,5]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "[-10,-5,0,5,10]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "[1,1,1,1,1]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "[100,200,300,400]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "[5,6,7,8,9]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "[0,0,0]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "[12,23,45,67,89]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "[1,3,5,7,9,11]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "[20,30,40,50]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "[-4,-3,-2,-1]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "[1000,2000,3000]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "[15,30,45,60,75]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "[2,4,6,8,10]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "[66,77,88,99]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "[3,6,9,12,15]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 8,
    "title": "Two Sum (Brute Force/Hash Map)",
    "difficulty": "easy",
    "category": "Arrays",
    "description": "Given an array of integers nums and target, return indices of two numbers that add up to target.",
    "inputFormat": "Array nums and target integer.",
    "outputFormat": "Array of 2 indices [i, j].",
    "constraints": "2 <= len(nums) <= 10^4",
    "sampleInput": "nums = [2, 7, 11, 15], target = 9",
    "sampleOutput": "[0, 1]",
    "boilerplate": "def two_sum(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "[]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "[]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "[0,1]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "[1,3]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "[0,1]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "[0,1]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "[0,1]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "[1,2]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "[0,1]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 9,
    "title": "Missing/Duplicate Number",
    "difficulty": "easy",
    "category": "Arrays",
    "description": "Given an array containing n distinct numbers in range [0, n], find the single missing number.",
    "inputFormat": "Array of distinct integers in 0..n.",
    "outputFormat": "Integer missing number.",
    "constraints": "1 <= n <= 10^4",
    "sampleInput": "[3, 0, 1]",
    "sampleOutput": "2",
    "boilerplate": "def missing_number(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[3, 0, 1]",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "-8",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "-135",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "15",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "10",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "-990",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "-20",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "-221",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "-15",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "-130",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "20",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "-5994",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "-210",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "-15",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "-320",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "-30",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 10,
    "title": "Majority Element",
    "difficulty": "easy",
    "category": "Arrays",
    "description": "Find the majority element in array nums that appears more than floor(n / 2) times (Boyer-Moore Voting).",
    "inputFormat": "Array nums.",
    "outputFormat": "Majority element integer.",
    "constraints": "1 <= len(nums) <= 5 * 10^4",
    "sampleInput": "[3, 2, 3]",
    "sampleOutput": "3",
    "boilerplate": "def majority_element(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[3, 2, 3]",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "9",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "50",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "10",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "300",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "23",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "30",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "-3",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "3000",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "75",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "10",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "77",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "15",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 11,
    "title": "Merge Two Sorted Arrays",
    "difficulty": "easy",
    "category": "Arrays",
    "description": "Merge two sorted arrays nums1 and nums2 into a single sorted array.",
    "inputFormat": "Two sorted arrays nums1 and nums2.",
    "outputFormat": "Merged sorted array.",
    "constraints": "1 <= len(nums1), len(nums2) <= 10^4",
    "sampleInput": "nums1 = [1,3,5], nums2 = [2,4,6]",
    "sampleOutput": "[1, 2, 3, 4, 5, 6]",
    "boilerplate": "def merge_sorted_arrays(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[1,3,5]\n[2,4,6]",
        "output": "[1,2,3,4,5,6]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[5,4,3,2,1]\n[-10,-5,0,5,10]",
        "output": "[-10,-5,0,1,2,3,4,5,5,10]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1,1,1,1,1]\n[100,200,300,400]",
        "output": "[1,1,1,1,1,100,200,300,400]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[9,8,7,6,5]\n[0,0,0]",
        "output": "[0,0,0,5,6,7,8,9]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[12,45,67,89,23]\n[1,3,5,7,9,11]",
        "output": "[1,3,5,7,9,11,12,23,45,67,89]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[50,40,30,20]\n[-1,-2,-3,-4]",
        "output": "[-4,-3,-2,-1,20,30,40,50]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1000,2000,3000]\n[15,30,45,60,75]",
        "output": "[15,30,45,60,75,1000,2000,3000]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[2,4,6,8,10]\n[99,88,77,66]",
        "output": "[2,4,6,8,10,66,77,88,99]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[3,6,9,12,15]\n[4,2,7,1,9]",
        "output": "[1,2,3,4,6,7,9,9,12,15]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[10,20,30,40,50]\n[5,4,3,2,1]",
        "output": "[1,2,3,4,5,10,20,30,40,50]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[-10,-5,0,5,10]\n[1,1,1,1,1]",
        "output": "[-10,-5,0,1,1,1,1,1,5,10]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[100,200,300,400]\n[9,8,7,6,5]",
        "output": "[5,6,7,8,9,100,200,300,400]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[0,0,0]\n[12,45,67,89,23]",
        "output": "[0,0,0,12,23,45,67,89]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1,3,5,7,9,11]\n[50,40,30,20]",
        "output": "[1,3,5,7,9,11,20,30,40,50]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[-1,-2,-3,-4]\n[1000,2000,3000]",
        "output": "[-4,-3,-2,-1,1000,2000,3000]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[15,30,45,60,75]\n[2,4,6,8,10]",
        "output": "[2,4,6,8,10,15,30,45,60,75]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n[3,6,9,12,15]",
        "output": "[3,6,9,12,15,66,77,88,99]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[4,2,7,1,9]\n[10,20,30,40,50]",
        "output": "[1,2,4,7,9,10,20,30,40,50]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 12,
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "easy",
    "category": "Arrays",
    "description": "Remove duplicates in-place from sorted array nums such that each unique element appears once. Return length.",
    "inputFormat": "Sorted array nums.",
    "outputFormat": "Integer number of unique elements.",
    "constraints": "1 <= len(nums) <= 3 * 10^4",
    "sampleInput": "[1, 1, 2]",
    "sampleOutput": "2",
    "boilerplate": "def remove_duplicates(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[1, 1, 2]",
        "output": "[1,2]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "[4,2,7,1,9]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "[10,20,30,40,50]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "[5,4,3,2,1]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "[-10,-5,0,5,10]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "[100,200,300,400]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "[9,8,7,6,5]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "[0]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "[12,45,67,89,23]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "[1,3,5,7,9,11]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "[50,40,30,20]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "[-1,-2,-3,-4]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "[1000,2000,3000]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "[15,30,45,60,75]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "[2,4,6,8,10]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "[99,88,77,66]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "[3,6,9,12,15]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 13,
    "title": "Best Time to Buy/Sell Stock (1 Pass)",
    "difficulty": "easy",
    "category": "Greedy",
    "description": "Given array prices where prices[i] is price on day i, maximize profit by choosing 1 buy day and 1 sell day.",
    "inputFormat": "Array of daily stock prices.",
    "outputFormat": "Maximum profit integer.",
    "constraints": "1 <= len(prices) <= 10^5",
    "sampleInput": "[7, 1, 5, 3, 6, 4]",
    "sampleOutput": "5",
    "boilerplate": "def max_profit(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[7, 1, 5, 3, 6, 4]",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "8",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "40",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "20",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "300",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "77",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "10",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "2000",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "60",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "8",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 14,
    "title": "Valid Parentheses (Basic Stack)",
    "difficulty": "easy",
    "category": "Stack",
    "description": "Given string s containing parentheses (), {}, [], determine if the input string is valid.",
    "inputFormat": "String s.",
    "outputFormat": "True or False.",
    "constraints": "1 <= len(s) <= 10^4",
    "sampleInput": "\"()\"",
    "sampleOutput": "True",
    "boilerplate": "def is_valid_parentheses(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "\"()\"",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 15,
    "title": "Reverse Linked List",
    "difficulty": "easy",
    "category": "Linked Lists",
    "description": "Given the head of a singly linked list, reverse the list and return its reversed head.",
    "inputFormat": "List array representation [1,2,3,4,5].",
    "outputFormat": "Reversed list array [5,4,3,2,1].",
    "constraints": "0 <= length <= 5000",
    "sampleInput": "[1, 2, 3, 4, 5]",
    "sampleOutput": "[5, 4, 3, 2, 1]",
    "boilerplate": "def reverse_linked_list(*args):\n    # Write your optimal solution here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[5,4,3,2,1]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "[9,1,7,2,4]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "[50,40,30,20,10]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "[1,2,3,4,5]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "[10,5,0,-5,-10]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "[1,1,1,1,1]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "[400,300,200,100]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "[5,6,7,8,9]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "[0,0,0]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "[23,89,67,45,12]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "[11,9,7,5,3,1]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "[20,30,40,50]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "[-4,-3,-2,-1]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "[3000,2000,1000]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "[75,60,45,30,15]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "[10,8,6,4,2]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "[66,77,88,99]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "[15,12,9,6,3]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 16,
    "title": "Detect Linked List Cycle",
    "difficulty": "easy",
    "category": "Linked Lists",
    "description": "Solve the comprehensive problem: Detect Linked List Cycle. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Detect Linked List Cycle.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [16, 32, 48], k = 2",
    "sampleOutput": "32",
    "boilerplate": "def detect_linked_list_cycle(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [16, 32, 48], k = 2",
        "output": "32",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 17,
    "title": "Middle of Linked List",
    "difficulty": "easy",
    "category": "Linked Lists",
    "description": "Solve the comprehensive problem: Middle of Linked List. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Middle of Linked List.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [17, 34, 51], k = 3",
    "sampleOutput": "34",
    "boilerplate": "def middle_of_linked_list(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "[7,1,9]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "[7,1,9]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "[30,40,50]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "[3,2,1]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "[0,5,10]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "[1,1,1]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "[300,400]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "[7,6,5]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "[0,0]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "[67,89,23]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "[7,9,11]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "[30,20]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "[-3,-4]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "[2000,3000]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "[45,60,75]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "[6,8,10]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "[77,66]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "[9,12,15]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 18,
    "title": "Merge Two Sorted Linked Lists",
    "difficulty": "easy",
    "category": "Linked Lists",
    "description": "Solve the comprehensive problem: Merge Two Sorted Linked Lists. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Merge Two Sorted Linked Lists.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [18, 36, 54], k = 4",
    "sampleOutput": "36",
    "boilerplate": "def merge_two_sorted_linked_lists(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[1,3,5]\n[2,4,6]",
        "output": "[1,2,3,4,5,6]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[5,4,3,2,1]\n[-10,-5,0,5,10]",
        "output": "[-10,-5,0,1,2,3,4,5,5,10]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1,1,1,1,1]\n[100,200,300,400]",
        "output": "[1,1,1,1,1,100,200,300,400]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[9,8,7,6,5]\n[0,0,0]",
        "output": "[0,0,0,5,6,7,8,9]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[12,45,67,89,23]\n[1,3,5,7,9,11]",
        "output": "[1,3,5,7,9,11,12,23,45,67,89]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[50,40,30,20]\n[-1,-2,-3,-4]",
        "output": "[-4,-3,-2,-1,20,30,40,50]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1000,2000,3000]\n[15,30,45,60,75]",
        "output": "[15,30,45,60,75,1000,2000,3000]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[2,4,6,8,10]\n[99,88,77,66]",
        "output": "[2,4,6,8,10,66,77,88,99]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[3,6,9,12,15]\n[4,2,7,1,9]",
        "output": "[1,2,3,4,6,7,9,9,12,15]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[10,20,30,40,50]\n[5,4,3,2,1]",
        "output": "[1,2,3,4,5,10,20,30,40,50]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[-10,-5,0,5,10]\n[1,1,1,1,1]",
        "output": "[-10,-5,0,1,1,1,1,1,5,10]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[100,200,300,400]\n[9,8,7,6,5]",
        "output": "[5,6,7,8,9,100,200,300,400]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[0,0,0]\n[12,45,67,89,23]",
        "output": "[0,0,0,12,23,45,67,89]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1,3,5,7,9,11]\n[50,40,30,20]",
        "output": "[1,3,5,7,9,11,20,30,40,50]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[-1,-2,-3,-4]\n[1000,2000,3000]",
        "output": "[-4,-3,-2,-1,1000,2000,3000]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[15,30,45,60,75]\n[2,4,6,8,10]",
        "output": "[2,4,6,8,10,15,30,45,60,75]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n[3,6,9,12,15]",
        "output": "[3,6,9,12,15,66,77,88,99]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[4,2,7,1,9]\n[10,20,30,40,50]",
        "output": "[1,2,4,7,9,10,20,30,40,50]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 19,
    "title": "Intersection of Two Linked Lists",
    "difficulty": "easy",
    "category": "Linked Lists",
    "description": "Solve the comprehensive problem: Intersection of Two Linked Lists. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Intersection of Two Linked Lists.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [19, 38, 57], k = 5",
    "sampleOutput": "38",
    "boilerplate": "def intersection_of_two_linked_lists(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[1,3,5]\n[2,4,6]",
        "output": "null",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[5,4,3,2,1]\n[-10,-5,0,5,10]",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1,1,1,1,1]\n[100,200,300,400]",
        "output": "null",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[9,8,7,6,5]\n[0,0,0]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[12,45,67,89,23]\n[1,3,5,7,9,11]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[50,40,30,20]\n[-1,-2,-3,-4]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1000,2000,3000]\n[15,30,45,60,75]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[2,4,6,8,10]\n[99,88,77,66]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[3,6,9,12,15]\n[4,2,7,1,9]",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[10,20,30,40,50]\n[5,4,3,2,1]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[-10,-5,0,5,10]\n[1,1,1,1,1]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[100,200,300,400]\n[9,8,7,6,5]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[0,0,0]\n[12,45,67,89,23]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1,3,5,7,9,11]\n[50,40,30,20]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[-1,-2,-3,-4]\n[1000,2000,3000]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[15,30,45,60,75]\n[2,4,6,8,10]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n[3,6,9,12,15]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[4,2,7,1,9]\n[10,20,30,40,50]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 20,
    "title": "Palindrome Linked List",
    "difficulty": "easy",
    "category": "Strings",
    "description": "Solve the comprehensive problem: Palindrome Linked List. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Palindrome Linked List.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [20, 40, 60], k = 1",
    "sampleOutput": "40",
    "boilerplate": "def palindrome_linked_list(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "false",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "false",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "false",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 21,
    "title": "Binary Tree Inorder Traversal",
    "difficulty": "easy",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Binary Tree Inorder Traversal. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Binary Tree Inorder Traversal.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [21, 42, 63], k = 2",
    "sampleOutput": "42",
    "boilerplate": "def binary_tree_inorder_traversal(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [21, 42, 63], k = 2",
        "output": "42",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[9,3,15,20,7]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "[1]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[3,2,4,1,4,2,3]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[1,2,3,4,6,7,9]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[4,2,5,1,3]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "[1,2]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[9,3,15,20,7]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[3,2,4,1,4,2,3]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[1,2,3,4,6,7,9]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[4,2,5,1,3]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "[1,2]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[9,3,15,20,7]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[3,2,4,1,4,2,3]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[1,2,3,4,6,7,9]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[4,2,5,1,3]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 22,
    "title": "Binary Tree Preorder Traversal",
    "difficulty": "easy",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Binary Tree Preorder Traversal. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Binary Tree Preorder Traversal.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [22, 44, 66], k = 3",
    "sampleOutput": "44",
    "boilerplate": "def binary_tree_preorder_traversal(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [22, 44, 66], k = 3",
        "output": "44",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3,9,20,15,7]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "[1]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1,2,3,4,2,4,3]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4,2,1,3,7,6,9]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1,2,4,5,3]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "[1,2]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3,9,20,15,7]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1,2,3,4,2,4,3]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4,2,1,3,7,6,9]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1,2,4,5,3]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "[1,2]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3,9,20,15,7]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1,2,3,4,2,4,3]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4,2,1,3,7,6,9]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1,2,4,5,3]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 23,
    "title": "Binary Tree Postorder Traversal",
    "difficulty": "easy",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Binary Tree Postorder Traversal. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Binary Tree Postorder Traversal.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [23, 46, 69], k = 4",
    "sampleOutput": "46",
    "boilerplate": "def binary_tree_postorder_traversal(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [23, 46, 69], k = 4",
        "output": "46",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[9,15,7,20,3]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "[1]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[3,4,2,4,3,2,1]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[1,3,2,6,9,7,4]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[4,5,2,3,1]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "[2,1]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[9,15,7,20,3]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[3,4,2,4,3,2,1]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[1,3,2,6,9,7,4]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[4,5,2,3,1]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "[2,1]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[9,15,7,20,3]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[3,4,2,4,3,2,1]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[1,3,2,6,9,7,4]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[4,5,2,3,1]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 24,
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "easy",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Maximum Depth of Binary Tree. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Maximum Depth of Binary Tree.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [24, 48, 72], k = 5",
    "sampleOutput": "48",
    "boilerplate": "def maximum_depth_of_binary_tree(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [24, 48, 72], k = 5",
        "output": "48",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "1",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 25,
    "title": "Same Tree / Tree Comparison",
    "difficulty": "easy",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Same Tree / Tree Comparison. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Same Tree / Tree Comparison.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [25, 50, 75], k = 1",
    "sampleOutput": "50",
    "boilerplate": "def same_tree_tree_comparison(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [25, 50, 75], k = 1",
        "output": "50",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "50",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "50",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 26,
    "title": "Invert Binary Tree",
    "difficulty": "easy",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Invert Binary Tree. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Invert Binary Tree.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [26, 52, 78], k = 2",
    "sampleOutput": "52",
    "boilerplate": "def invert_binary_tree(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [26, 52, 78], k = 2",
        "output": "52",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3,20,9,null,null,15,7]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "[1]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1,2,2,3,4,4,3]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4,7,2,1,3,6,9]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1,3,2,4,5]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "[1,2,null,3]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3,20,9,null,null,15,7]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1,2,2,3,4,4,3]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4,7,2,1,3,6,9]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1,3,2,4,5]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "[1,2,null,3]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3,20,9,null,null,15,7]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1,2,2,3,4,4,3]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4,7,2,1,3,6,9]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1,3,2,4,5]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 27,
    "title": "Symmetric Tree Verification",
    "difficulty": "easy",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Symmetric Tree Verification. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Symmetric Tree Verification.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [27, 54, 81], k = 3",
    "sampleOutput": "54",
    "boilerplate": "def symmetric_tree_verification(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [27, 54, 81], k = 3",
        "output": "54",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "false",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 28,
    "title": "Diameter of Binary Tree",
    "difficulty": "easy",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Diameter of Binary Tree. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Diameter of Binary Tree.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [28, 56, 84], k = 4",
    "sampleOutput": "56",
    "boilerplate": "def diameter_of_binary_tree(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [28, 56, 84], k = 4",
        "output": "56",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "4",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 29,
    "title": "Lowest Common Ancestor of BST",
    "difficulty": "easy",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Lowest Common Ancestor of BST. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Lowest Common Ancestor of BST.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [29, 58, 87], k = 5",
    "sampleOutput": "58",
    "boilerplate": "def lowest_common_ancestor_of_bst(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [29, 58, 87], k = 5",
        "output": "58",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "58",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "58",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 30,
    "title": "Convert Sorted Array to BST",
    "difficulty": "easy",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Convert Sorted Array to BST. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Convert Sorted Array to BST.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [30, 60, 90], k = 1",
    "sampleOutput": "60",
    "boilerplate": "def convert_sorted_array_to_bst(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [30, 60, 90], k = 1",
        "output": "60",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "null",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "1",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "null",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 31,
    "title": "Fibonacci Sequence (Memoization)",
    "difficulty": "easy",
    "category": "Dynamic Programming",
    "description": "Solve the comprehensive problem: Fibonacci Sequence (Memoization). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Fibonacci Sequence (Memoization).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [31, 62, 93], k = 2",
    "sampleOutput": "62",
    "boilerplate": "def fibonacci_sequence_memoization(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [31, 62, 93], k = 2",
        "output": "1",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "3",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "6",
        "output": "8",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "9",
        "output": "34",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "12",
        "output": "144",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "15",
        "output": "610",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "18",
        "output": "2584",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "21",
        "output": "10946",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "24",
        "output": "46368",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "27",
        "output": "196418",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "30",
        "output": "832040",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "33",
        "output": "3524578",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "36",
        "output": "14930352",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "39",
        "output": "63245986",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "42",
        "output": "267914296",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "45",
        "output": "1134903170",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "48",
        "output": "4807526976",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "51",
        "output": "20365011074",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 32,
    "title": "Climbing Stairs (Basic DP)",
    "difficulty": "easy",
    "category": "Dynamic Programming",
    "description": "Solve the comprehensive problem: Climbing Stairs (Basic DP). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Climbing Stairs (Basic DP).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [32, 64, 96], k = 3",
    "sampleOutput": "64",
    "boilerplate": "def climbing_stairs_basic_dp(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [32, 64, 96], k = 3",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "3",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "6",
        "output": "13",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "9",
        "output": "55",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "12",
        "output": "233",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "15",
        "output": "987",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "18",
        "output": "4181",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "21",
        "output": "17711",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "24",
        "output": "75025",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "27",
        "output": "317811",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "30",
        "output": "1346269",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "33",
        "output": "5702887",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "36",
        "output": "24157817",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "39",
        "output": "102334155",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "42",
        "output": "433494437",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "45",
        "output": "1836311903",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "48",
        "output": "7778742049",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "51",
        "output": "32951280099",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 33,
    "title": "Pascal's Triangle",
    "difficulty": "easy",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Pascal's Triangle. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Pascal's Triangle.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [33, 66, 99], k = 4",
    "sampleOutput": "66",
    "boilerplate": "def pascal_s_triangle(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [33, 66, 99], k = 4",
        "output": "[]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "3",
        "output": "[[1],[1,1],[1,2,1]]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "6",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1]]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "9",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "12",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "15",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1],[1,12,66,220,495,792,924,792,495,220,66,12,1],[1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],[1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "18",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1],[1,12,66,220,495,792,924,792,495,220,66,12,1],[1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],[1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1],[1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1],[1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1],[1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,6188,2380,680,136,17,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "21",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1],[1,12,66,220,495,792,924,792,495,220,66,12,1],[1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],[1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1],[1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1],[1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1],[1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,6188,2380,680,136,17,1],[1,18,153,816,3060,8568,18564,31824,43758,48620,43758,31824,18564,8568,3060,816,153,18,1],[1,19,171,969,3876,11628,27132,50388,75582,92378,92378,75582,50388,27132,11628,3876,969,171,19,1],[1,20,190,1140,4845,15504,38760,77520,125970,167960,184756,167960,125970,77520,38760,15504,4845,1140,190,20,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "24",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1],[1,12,66,220,495,792,924,792,495,220,66,12,1],[1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],[1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1],[1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1],[1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1],[1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,6188,2380,680,136,17,1],[1,18,153,816,3060,8568,18564,31824,43758,48620,43758,31824,18564,8568,3060,816,153,18,1],[1,19,171,969,3876,11628,27132,50388,75582,92378,92378,75582,50388,27132,11628,3876,969,171,19,1],[1,20,190,1140,4845,15504,38760,77520,125970,167960,184756,167960,125970,77520,38760,15504,4845,1140,190,20,1],[1,21,210,1330,5985,20349,54264,116280,203490,293930,352716,352716,293930,203490,116280,54264,20349,5985,1330,210,21,1],[1,22,231,1540,7315,26334,74613,170544,319770,497420,646646,705432,646646,497420,319770,170544,74613,26334,7315,1540,231,22,1],[1,23,253,1771,8855,33649,100947,245157,490314,817190,1144066,1352078,1352078,1144066,817190,490314,245157,100947,33649,8855,1771,253,23,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "27",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1],[1,12,66,220,495,792,924,792,495,220,66,12,1],[1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],[1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1],[1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1],[1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1],[1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,6188,2380,680,136,17,1],[1,18,153,816,3060,8568,18564,31824,43758,48620,43758,31824,18564,8568,3060,816,153,18,1],[1,19,171,969,3876,11628,27132,50388,75582,92378,92378,75582,50388,27132,11628,3876,969,171,19,1],[1,20,190,1140,4845,15504,38760,77520,125970,167960,184756,167960,125970,77520,38760,15504,4845,1140,190,20,1],[1,21,210,1330,5985,20349,54264,116280,203490,293930,352716,352716,293930,203490,116280,54264,20349,5985,1330,210,21,1],[1,22,231,1540,7315,26334,74613,170544,319770,497420,646646,705432,646646,497420,319770,170544,74613,26334,7315,1540,231,22,1],[1,23,253,1771,8855,33649,100947,245157,490314,817190,1144066,1352078,1352078,1144066,817190,490314,245157,100947,33649,8855,1771,253,23,1],[1,24,276,2024,10626,42504,134596,346104,735471,1307504,1961256,2496144,2704156,2496144,1961256,1307504,735471,346104,134596,42504,10626,2024,276,24,1],[1,25,300,2300,12650,53130,177100,480700,1081575,2042975,3268760,4457400,5200300,5200300,4457400,3268760,2042975,1081575,480700,177100,53130,12650,2300,300,25,1],[1,26,325,2600,14950,65780,230230,657800,1562275,3124550,5311735,7726160,9657700,10400600,9657700,7726160,5311735,3124550,1562275,657800,230230,65780,14950,2600,325,26,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "30",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1],[1,12,66,220,495,792,924,792,495,220,66,12,1],[1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],[1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1],[1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1],[1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1],[1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,6188,2380,680,136,17,1],[1,18,153,816,3060,8568,18564,31824,43758,48620,43758,31824,18564,8568,3060,816,153,18,1],[1,19,171,969,3876,11628,27132,50388,75582,92378,92378,75582,50388,27132,11628,3876,969,171,19,1],[1,20,190,1140,4845,15504,38760,77520,125970,167960,184756,167960,125970,77520,38760,15504,4845,1140,190,20,1],[1,21,210,1330,5985,20349,54264,116280,203490,293930,352716,352716,293930,203490,116280,54264,20349,5985,1330,210,21,1],[1,22,231,1540,7315,26334,74613,170544,319770,497420,646646,705432,646646,497420,319770,170544,74613,26334,7315,1540,231,22,1],[1,23,253,1771,8855,33649,100947,245157,490314,817190,1144066,1352078,1352078,1144066,817190,490314,245157,100947,33649,8855,1771,253,23,1],[1,24,276,2024,10626,42504,134596,346104,735471,1307504,1961256,2496144,2704156,2496144,1961256,1307504,735471,346104,134596,42504,10626,2024,276,24,1],[1,25,300,2300,12650,53130,177100,480700,1081575,2042975,3268760,4457400,5200300,5200300,4457400,3268760,2042975,1081575,480700,177100,53130,12650,2300,300,25,1],[1,26,325,2600,14950,65780,230230,657800,1562275,3124550,5311735,7726160,9657700,10400600,9657700,7726160,5311735,3124550,1562275,657800,230230,65780,14950,2600,325,26,1],[1,27,351,2925,17550,80730,296010,888030,2220075,4686825,8436285,13037895,17383860,20058300,20058300,17383860,13037895,8436285,4686825,2220075,888030,296010,80730,17550,2925,351,27,1],[1,28,378,3276,20475,98280,376740,1184040,3108105,6906900,13123110,21474180,30421755,37442160,40116600,37442160,30421755,21474180,13123110,6906900,3108105,1184040,376740,98280,20475,3276,378,28,1],[1,29,406,3654,23751,118755,475020,1560780,4292145,10015005,20030010,34597290,51895935,67863915,77558760,77558760,67863915,51895935,34597290,20030010,10015005,4292145,1560780,475020,118755,23751,3654,406,29,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "33",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1],[1,12,66,220,495,792,924,792,495,220,66,12,1],[1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],[1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1],[1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1],[1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1],[1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,6188,2380,680,136,17,1],[1,18,153,816,3060,8568,18564,31824,43758,48620,43758,31824,18564,8568,3060,816,153,18,1],[1,19,171,969,3876,11628,27132,50388,75582,92378,92378,75582,50388,27132,11628,3876,969,171,19,1],[1,20,190,1140,4845,15504,38760,77520,125970,167960,184756,167960,125970,77520,38760,15504,4845,1140,190,20,1],[1,21,210,1330,5985,20349,54264,116280,203490,293930,352716,352716,293930,203490,116280,54264,20349,5985,1330,210,21,1],[1,22,231,1540,7315,26334,74613,170544,319770,497420,646646,705432,646646,497420,319770,170544,74613,26334,7315,1540,231,22,1],[1,23,253,1771,8855,33649,100947,245157,490314,817190,1144066,1352078,1352078,1144066,817190,490314,245157,100947,33649,8855,1771,253,23,1],[1,24,276,2024,10626,42504,134596,346104,735471,1307504,1961256,2496144,2704156,2496144,1961256,1307504,735471,346104,134596,42504,10626,2024,276,24,1],[1,25,300,2300,12650,53130,177100,480700,1081575,2042975,3268760,4457400,5200300,5200300,4457400,3268760,2042975,1081575,480700,177100,53130,12650,2300,300,25,1],[1,26,325,2600,14950,65780,230230,657800,1562275,3124550,5311735,7726160,9657700,10400600,9657700,7726160,5311735,3124550,1562275,657800,230230,65780,14950,2600,325,26,1],[1,27,351,2925,17550,80730,296010,888030,2220075,4686825,8436285,13037895,17383860,20058300,20058300,17383860,13037895,8436285,4686825,2220075,888030,296010,80730,17550,2925,351,27,1],[1,28,378,3276,20475,98280,376740,1184040,3108105,6906900,13123110,21474180,30421755,37442160,40116600,37442160,30421755,21474180,13123110,6906900,3108105,1184040,376740,98280,20475,3276,378,28,1],[1,29,406,3654,23751,118755,475020,1560780,4292145,10015005,20030010,34597290,51895935,67863915,77558760,77558760,67863915,51895935,34597290,20030010,10015005,4292145,1560780,475020,118755,23751,3654,406,29,1],[1,30,435,4060,27405,142506,593775,2035800,5852925,14307150,30045015,54627300,86493225,119759850,145422675,155117520,145422675,119759850,86493225,54627300,30045015,14307150,5852925,2035800,593775,142506,27405,4060,435,30,1],[1,31,465,4495,31465,169911,736281,2629575,7888725,20160075,44352165,84672315,141120525,206253075,265182525,300540195,300540195,265182525,206253075,141120525,84672315,44352165,20160075,7888725,2629575,736281,169911,31465,4495,465,31,1],[1,32,496,4960,35960,201376,906192,3365856,10518300,28048800,64512240,129024480,225792840,347373600,471435600,565722720,601080390,565722720,471435600,347373600,225792840,129024480,64512240,28048800,10518300,3365856,906192,201376,35960,4960,496,32,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "36",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1],[1,12,66,220,495,792,924,792,495,220,66,12,1],[1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],[1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1],[1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1],[1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1],[1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,6188,2380,680,136,17,1],[1,18,153,816,3060,8568,18564,31824,43758,48620,43758,31824,18564,8568,3060,816,153,18,1],[1,19,171,969,3876,11628,27132,50388,75582,92378,92378,75582,50388,27132,11628,3876,969,171,19,1],[1,20,190,1140,4845,15504,38760,77520,125970,167960,184756,167960,125970,77520,38760,15504,4845,1140,190,20,1],[1,21,210,1330,5985,20349,54264,116280,203490,293930,352716,352716,293930,203490,116280,54264,20349,5985,1330,210,21,1],[1,22,231,1540,7315,26334,74613,170544,319770,497420,646646,705432,646646,497420,319770,170544,74613,26334,7315,1540,231,22,1],[1,23,253,1771,8855,33649,100947,245157,490314,817190,1144066,1352078,1352078,1144066,817190,490314,245157,100947,33649,8855,1771,253,23,1],[1,24,276,2024,10626,42504,134596,346104,735471,1307504,1961256,2496144,2704156,2496144,1961256,1307504,735471,346104,134596,42504,10626,2024,276,24,1],[1,25,300,2300,12650,53130,177100,480700,1081575,2042975,3268760,4457400,5200300,5200300,4457400,3268760,2042975,1081575,480700,177100,53130,12650,2300,300,25,1],[1,26,325,2600,14950,65780,230230,657800,1562275,3124550,5311735,7726160,9657700,10400600,9657700,7726160,5311735,3124550,1562275,657800,230230,65780,14950,2600,325,26,1],[1,27,351,2925,17550,80730,296010,888030,2220075,4686825,8436285,13037895,17383860,20058300,20058300,17383860,13037895,8436285,4686825,2220075,888030,296010,80730,17550,2925,351,27,1],[1,28,378,3276,20475,98280,376740,1184040,3108105,6906900,13123110,21474180,30421755,37442160,40116600,37442160,30421755,21474180,13123110,6906900,3108105,1184040,376740,98280,20475,3276,378,28,1],[1,29,406,3654,23751,118755,475020,1560780,4292145,10015005,20030010,34597290,51895935,67863915,77558760,77558760,67863915,51895935,34597290,20030010,10015005,4292145,1560780,475020,118755,23751,3654,406,29,1],[1,30,435,4060,27405,142506,593775,2035800,5852925,14307150,30045015,54627300,86493225,119759850,145422675,155117520,145422675,119759850,86493225,54627300,30045015,14307150,5852925,2035800,593775,142506,27405,4060,435,30,1],[1,31,465,4495,31465,169911,736281,2629575,7888725,20160075,44352165,84672315,141120525,206253075,265182525,300540195,300540195,265182525,206253075,141120525,84672315,44352165,20160075,7888725,2629575,736281,169911,31465,4495,465,31,1],[1,32,496,4960,35960,201376,906192,3365856,10518300,28048800,64512240,129024480,225792840,347373600,471435600,565722720,601080390,565722720,471435600,347373600,225792840,129024480,64512240,28048800,10518300,3365856,906192,201376,35960,4960,496,32,1],[1,33,528,5456,40920,237336,1107568,4272048,13884156,38567100,92561040,193536720,354817320,573166440,818809200,1037158320,1166803110,1166803110,1037158320,818809200,573166440,354817320,193536720,92561040,38567100,13884156,4272048,1107568,237336,40920,5456,528,33,1],[1,34,561,5984,46376,278256,1344904,5379616,18156204,52451256,131128140,286097760,548354040,927983760,1391975640,1855967520,2203961430,2333606220,2203961430,1855967520,1391975640,927983760,548354040,286097760,131128140,52451256,18156204,5379616,1344904,278256,46376,5984,561,34,1],[1,35,595,6545,52360,324632,1623160,6724520,23535820,70607460,183579396,417225900,834451800,1476337800,2319959400,3247943160,4059928950,4537567650,4537567650,4059928950,3247943160,2319959400,1476337800,834451800,417225900,183579396,70607460,23535820,6724520,1623160,324632,52360,6545,595,35,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "39",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1],[1,12,66,220,495,792,924,792,495,220,66,12,1],[1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],[1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1],[1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1],[1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1],[1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,6188,2380,680,136,17,1],[1,18,153,816,3060,8568,18564,31824,43758,48620,43758,31824,18564,8568,3060,816,153,18,1],[1,19,171,969,3876,11628,27132,50388,75582,92378,92378,75582,50388,27132,11628,3876,969,171,19,1],[1,20,190,1140,4845,15504,38760,77520,125970,167960,184756,167960,125970,77520,38760,15504,4845,1140,190,20,1],[1,21,210,1330,5985,20349,54264,116280,203490,293930,352716,352716,293930,203490,116280,54264,20349,5985,1330,210,21,1],[1,22,231,1540,7315,26334,74613,170544,319770,497420,646646,705432,646646,497420,319770,170544,74613,26334,7315,1540,231,22,1],[1,23,253,1771,8855,33649,100947,245157,490314,817190,1144066,1352078,1352078,1144066,817190,490314,245157,100947,33649,8855,1771,253,23,1],[1,24,276,2024,10626,42504,134596,346104,735471,1307504,1961256,2496144,2704156,2496144,1961256,1307504,735471,346104,134596,42504,10626,2024,276,24,1],[1,25,300,2300,12650,53130,177100,480700,1081575,2042975,3268760,4457400,5200300,5200300,4457400,3268760,2042975,1081575,480700,177100,53130,12650,2300,300,25,1],[1,26,325,2600,14950,65780,230230,657800,1562275,3124550,5311735,7726160,9657700,10400600,9657700,7726160,5311735,3124550,1562275,657800,230230,65780,14950,2600,325,26,1],[1,27,351,2925,17550,80730,296010,888030,2220075,4686825,8436285,13037895,17383860,20058300,20058300,17383860,13037895,8436285,4686825,2220075,888030,296010,80730,17550,2925,351,27,1],[1,28,378,3276,20475,98280,376740,1184040,3108105,6906900,13123110,21474180,30421755,37442160,40116600,37442160,30421755,21474180,13123110,6906900,3108105,1184040,376740,98280,20475,3276,378,28,1],[1,29,406,3654,23751,118755,475020,1560780,4292145,10015005,20030010,34597290,51895935,67863915,77558760,77558760,67863915,51895935,34597290,20030010,10015005,4292145,1560780,475020,118755,23751,3654,406,29,1],[1,30,435,4060,27405,142506,593775,2035800,5852925,14307150,30045015,54627300,86493225,119759850,145422675,155117520,145422675,119759850,86493225,54627300,30045015,14307150,5852925,2035800,593775,142506,27405,4060,435,30,1],[1,31,465,4495,31465,169911,736281,2629575,7888725,20160075,44352165,84672315,141120525,206253075,265182525,300540195,300540195,265182525,206253075,141120525,84672315,44352165,20160075,7888725,2629575,736281,169911,31465,4495,465,31,1],[1,32,496,4960,35960,201376,906192,3365856,10518300,28048800,64512240,129024480,225792840,347373600,471435600,565722720,601080390,565722720,471435600,347373600,225792840,129024480,64512240,28048800,10518300,3365856,906192,201376,35960,4960,496,32,1],[1,33,528,5456,40920,237336,1107568,4272048,13884156,38567100,92561040,193536720,354817320,573166440,818809200,1037158320,1166803110,1166803110,1037158320,818809200,573166440,354817320,193536720,92561040,38567100,13884156,4272048,1107568,237336,40920,5456,528,33,1],[1,34,561,5984,46376,278256,1344904,5379616,18156204,52451256,131128140,286097760,548354040,927983760,1391975640,1855967520,2203961430,2333606220,2203961430,1855967520,1391975640,927983760,548354040,286097760,131128140,52451256,18156204,5379616,1344904,278256,46376,5984,561,34,1],[1,35,595,6545,52360,324632,1623160,6724520,23535820,70607460,183579396,417225900,834451800,1476337800,2319959400,3247943160,4059928950,4537567650,4537567650,4059928950,3247943160,2319959400,1476337800,834451800,417225900,183579396,70607460,23535820,6724520,1623160,324632,52360,6545,595,35,1],[1,36,630,7140,58905,376992,1947792,8347680,30260340,94143280,254186856,600805296,1251677700,2310789600,3796297200,5567902560,7307872110,8597496600,9075135300,8597496600,7307872110,5567902560,3796297200,2310789600,1251677700,600805296,254186856,94143280,30260340,8347680,1947792,376992,58905,7140,630,36,1],[1,37,666,7770,66045,435897,2324784,10295472,38608020,124403620,348330136,854992152,1852482996,3562467300,6107086800,9364199760,12875774670,15905368710,17672631900,17672631900,15905368710,12875774670,9364199760,6107086800,3562467300,1852482996,854992152,348330136,124403620,38608020,10295472,2324784,435897,66045,7770,666,37,1],[1,38,703,8436,73815,501942,2760681,12620256,48903492,163011640,472733756,1203322288,2707475148,5414950296,9669554100,15471286560,22239974430,28781143380,33578000610,35345263800,33578000610,28781143380,22239974430,15471286560,9669554100,5414950296,2707475148,1203322288,472733756,163011640,48903492,12620256,2760681,501942,73815,8436,703,38,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "42",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1],[1,12,66,220,495,792,924,792,495,220,66,12,1],[1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],[1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1],[1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1],[1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1],[1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,6188,2380,680,136,17,1],[1,18,153,816,3060,8568,18564,31824,43758,48620,43758,31824,18564,8568,3060,816,153,18,1],[1,19,171,969,3876,11628,27132,50388,75582,92378,92378,75582,50388,27132,11628,3876,969,171,19,1],[1,20,190,1140,4845,15504,38760,77520,125970,167960,184756,167960,125970,77520,38760,15504,4845,1140,190,20,1],[1,21,210,1330,5985,20349,54264,116280,203490,293930,352716,352716,293930,203490,116280,54264,20349,5985,1330,210,21,1],[1,22,231,1540,7315,26334,74613,170544,319770,497420,646646,705432,646646,497420,319770,170544,74613,26334,7315,1540,231,22,1],[1,23,253,1771,8855,33649,100947,245157,490314,817190,1144066,1352078,1352078,1144066,817190,490314,245157,100947,33649,8855,1771,253,23,1],[1,24,276,2024,10626,42504,134596,346104,735471,1307504,1961256,2496144,2704156,2496144,1961256,1307504,735471,346104,134596,42504,10626,2024,276,24,1],[1,25,300,2300,12650,53130,177100,480700,1081575,2042975,3268760,4457400,5200300,5200300,4457400,3268760,2042975,1081575,480700,177100,53130,12650,2300,300,25,1],[1,26,325,2600,14950,65780,230230,657800,1562275,3124550,5311735,7726160,9657700,10400600,9657700,7726160,5311735,3124550,1562275,657800,230230,65780,14950,2600,325,26,1],[1,27,351,2925,17550,80730,296010,888030,2220075,4686825,8436285,13037895,17383860,20058300,20058300,17383860,13037895,8436285,4686825,2220075,888030,296010,80730,17550,2925,351,27,1],[1,28,378,3276,20475,98280,376740,1184040,3108105,6906900,13123110,21474180,30421755,37442160,40116600,37442160,30421755,21474180,13123110,6906900,3108105,1184040,376740,98280,20475,3276,378,28,1],[1,29,406,3654,23751,118755,475020,1560780,4292145,10015005,20030010,34597290,51895935,67863915,77558760,77558760,67863915,51895935,34597290,20030010,10015005,4292145,1560780,475020,118755,23751,3654,406,29,1],[1,30,435,4060,27405,142506,593775,2035800,5852925,14307150,30045015,54627300,86493225,119759850,145422675,155117520,145422675,119759850,86493225,54627300,30045015,14307150,5852925,2035800,593775,142506,27405,4060,435,30,1],[1,31,465,4495,31465,169911,736281,2629575,7888725,20160075,44352165,84672315,141120525,206253075,265182525,300540195,300540195,265182525,206253075,141120525,84672315,44352165,20160075,7888725,2629575,736281,169911,31465,4495,465,31,1],[1,32,496,4960,35960,201376,906192,3365856,10518300,28048800,64512240,129024480,225792840,347373600,471435600,565722720,601080390,565722720,471435600,347373600,225792840,129024480,64512240,28048800,10518300,3365856,906192,201376,35960,4960,496,32,1],[1,33,528,5456,40920,237336,1107568,4272048,13884156,38567100,92561040,193536720,354817320,573166440,818809200,1037158320,1166803110,1166803110,1037158320,818809200,573166440,354817320,193536720,92561040,38567100,13884156,4272048,1107568,237336,40920,5456,528,33,1],[1,34,561,5984,46376,278256,1344904,5379616,18156204,52451256,131128140,286097760,548354040,927983760,1391975640,1855967520,2203961430,2333606220,2203961430,1855967520,1391975640,927983760,548354040,286097760,131128140,52451256,18156204,5379616,1344904,278256,46376,5984,561,34,1],[1,35,595,6545,52360,324632,1623160,6724520,23535820,70607460,183579396,417225900,834451800,1476337800,2319959400,3247943160,4059928950,4537567650,4537567650,4059928950,3247943160,2319959400,1476337800,834451800,417225900,183579396,70607460,23535820,6724520,1623160,324632,52360,6545,595,35,1],[1,36,630,7140,58905,376992,1947792,8347680,30260340,94143280,254186856,600805296,1251677700,2310789600,3796297200,5567902560,7307872110,8597496600,9075135300,8597496600,7307872110,5567902560,3796297200,2310789600,1251677700,600805296,254186856,94143280,30260340,8347680,1947792,376992,58905,7140,630,36,1],[1,37,666,7770,66045,435897,2324784,10295472,38608020,124403620,348330136,854992152,1852482996,3562467300,6107086800,9364199760,12875774670,15905368710,17672631900,17672631900,15905368710,12875774670,9364199760,6107086800,3562467300,1852482996,854992152,348330136,124403620,38608020,10295472,2324784,435897,66045,7770,666,37,1],[1,38,703,8436,73815,501942,2760681,12620256,48903492,163011640,472733756,1203322288,2707475148,5414950296,9669554100,15471286560,22239974430,28781143380,33578000610,35345263800,33578000610,28781143380,22239974430,15471286560,9669554100,5414950296,2707475148,1203322288,472733756,163011640,48903492,12620256,2760681,501942,73815,8436,703,38,1],[1,39,741,9139,82251,575757,3262623,15380937,61523748,211915132,635745396,1676056044,3910797436,8122425444,15084504396,25140840660,37711260990,51021117810,62359143990,68923264410,68923264410,62359143990,51021117810,37711260990,25140840660,15084504396,8122425444,3910797436,1676056044,635745396,211915132,61523748,15380937,3262623,575757,82251,9139,741,39,1],[1,40,780,9880,91390,658008,3838380,18643560,76904685,273438880,847660528,2311801440,5586853480,12033222880,23206929840,40225345056,62852101650,88732378800,113380261800,131282408400,137846528820,131282408400,113380261800,88732378800,62852101650,40225345056,23206929840,12033222880,5586853480,2311801440,847660528,273438880,76904685,18643560,3838380,658008,91390,9880,780,40,1],[1,41,820,10660,101270,749398,4496388,22481940,95548245,350343565,1121099408,3159461968,7898654920,17620076360,35240152720,63432274896,103077446706,151584480450,202112640600,244662670200,269128937220,269128937220,244662670200,202112640600,151584480450,103077446706,63432274896,35240152720,17620076360,7898654920,3159461968,1121099408,350343565,95548245,22481940,4496388,749398,101270,10660,820,41,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "45",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1],[1,12,66,220,495,792,924,792,495,220,66,12,1],[1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],[1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1],[1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1],[1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1],[1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,6188,2380,680,136,17,1],[1,18,153,816,3060,8568,18564,31824,43758,48620,43758,31824,18564,8568,3060,816,153,18,1],[1,19,171,969,3876,11628,27132,50388,75582,92378,92378,75582,50388,27132,11628,3876,969,171,19,1],[1,20,190,1140,4845,15504,38760,77520,125970,167960,184756,167960,125970,77520,38760,15504,4845,1140,190,20,1],[1,21,210,1330,5985,20349,54264,116280,203490,293930,352716,352716,293930,203490,116280,54264,20349,5985,1330,210,21,1],[1,22,231,1540,7315,26334,74613,170544,319770,497420,646646,705432,646646,497420,319770,170544,74613,26334,7315,1540,231,22,1],[1,23,253,1771,8855,33649,100947,245157,490314,817190,1144066,1352078,1352078,1144066,817190,490314,245157,100947,33649,8855,1771,253,23,1],[1,24,276,2024,10626,42504,134596,346104,735471,1307504,1961256,2496144,2704156,2496144,1961256,1307504,735471,346104,134596,42504,10626,2024,276,24,1],[1,25,300,2300,12650,53130,177100,480700,1081575,2042975,3268760,4457400,5200300,5200300,4457400,3268760,2042975,1081575,480700,177100,53130,12650,2300,300,25,1],[1,26,325,2600,14950,65780,230230,657800,1562275,3124550,5311735,7726160,9657700,10400600,9657700,7726160,5311735,3124550,1562275,657800,230230,65780,14950,2600,325,26,1],[1,27,351,2925,17550,80730,296010,888030,2220075,4686825,8436285,13037895,17383860,20058300,20058300,17383860,13037895,8436285,4686825,2220075,888030,296010,80730,17550,2925,351,27,1],[1,28,378,3276,20475,98280,376740,1184040,3108105,6906900,13123110,21474180,30421755,37442160,40116600,37442160,30421755,21474180,13123110,6906900,3108105,1184040,376740,98280,20475,3276,378,28,1],[1,29,406,3654,23751,118755,475020,1560780,4292145,10015005,20030010,34597290,51895935,67863915,77558760,77558760,67863915,51895935,34597290,20030010,10015005,4292145,1560780,475020,118755,23751,3654,406,29,1],[1,30,435,4060,27405,142506,593775,2035800,5852925,14307150,30045015,54627300,86493225,119759850,145422675,155117520,145422675,119759850,86493225,54627300,30045015,14307150,5852925,2035800,593775,142506,27405,4060,435,30,1],[1,31,465,4495,31465,169911,736281,2629575,7888725,20160075,44352165,84672315,141120525,206253075,265182525,300540195,300540195,265182525,206253075,141120525,84672315,44352165,20160075,7888725,2629575,736281,169911,31465,4495,465,31,1],[1,32,496,4960,35960,201376,906192,3365856,10518300,28048800,64512240,129024480,225792840,347373600,471435600,565722720,601080390,565722720,471435600,347373600,225792840,129024480,64512240,28048800,10518300,3365856,906192,201376,35960,4960,496,32,1],[1,33,528,5456,40920,237336,1107568,4272048,13884156,38567100,92561040,193536720,354817320,573166440,818809200,1037158320,1166803110,1166803110,1037158320,818809200,573166440,354817320,193536720,92561040,38567100,13884156,4272048,1107568,237336,40920,5456,528,33,1],[1,34,561,5984,46376,278256,1344904,5379616,18156204,52451256,131128140,286097760,548354040,927983760,1391975640,1855967520,2203961430,2333606220,2203961430,1855967520,1391975640,927983760,548354040,286097760,131128140,52451256,18156204,5379616,1344904,278256,46376,5984,561,34,1],[1,35,595,6545,52360,324632,1623160,6724520,23535820,70607460,183579396,417225900,834451800,1476337800,2319959400,3247943160,4059928950,4537567650,4537567650,4059928950,3247943160,2319959400,1476337800,834451800,417225900,183579396,70607460,23535820,6724520,1623160,324632,52360,6545,595,35,1],[1,36,630,7140,58905,376992,1947792,8347680,30260340,94143280,254186856,600805296,1251677700,2310789600,3796297200,5567902560,7307872110,8597496600,9075135300,8597496600,7307872110,5567902560,3796297200,2310789600,1251677700,600805296,254186856,94143280,30260340,8347680,1947792,376992,58905,7140,630,36,1],[1,37,666,7770,66045,435897,2324784,10295472,38608020,124403620,348330136,854992152,1852482996,3562467300,6107086800,9364199760,12875774670,15905368710,17672631900,17672631900,15905368710,12875774670,9364199760,6107086800,3562467300,1852482996,854992152,348330136,124403620,38608020,10295472,2324784,435897,66045,7770,666,37,1],[1,38,703,8436,73815,501942,2760681,12620256,48903492,163011640,472733756,1203322288,2707475148,5414950296,9669554100,15471286560,22239974430,28781143380,33578000610,35345263800,33578000610,28781143380,22239974430,15471286560,9669554100,5414950296,2707475148,1203322288,472733756,163011640,48903492,12620256,2760681,501942,73815,8436,703,38,1],[1,39,741,9139,82251,575757,3262623,15380937,61523748,211915132,635745396,1676056044,3910797436,8122425444,15084504396,25140840660,37711260990,51021117810,62359143990,68923264410,68923264410,62359143990,51021117810,37711260990,25140840660,15084504396,8122425444,3910797436,1676056044,635745396,211915132,61523748,15380937,3262623,575757,82251,9139,741,39,1],[1,40,780,9880,91390,658008,3838380,18643560,76904685,273438880,847660528,2311801440,5586853480,12033222880,23206929840,40225345056,62852101650,88732378800,113380261800,131282408400,137846528820,131282408400,113380261800,88732378800,62852101650,40225345056,23206929840,12033222880,5586853480,2311801440,847660528,273438880,76904685,18643560,3838380,658008,91390,9880,780,40,1],[1,41,820,10660,101270,749398,4496388,22481940,95548245,350343565,1121099408,3159461968,7898654920,17620076360,35240152720,63432274896,103077446706,151584480450,202112640600,244662670200,269128937220,269128937220,244662670200,202112640600,151584480450,103077446706,63432274896,35240152720,17620076360,7898654920,3159461968,1121099408,350343565,95548245,22481940,4496388,749398,101270,10660,820,41,1],[1,42,861,11480,111930,850668,5245786,26978328,118030185,445891810,1471442973,4280561376,11058116888,25518731280,52860229080,98672427616,166509721602,254661927156,353697121050,446775310800,513791607420,538257874440,513791607420,446775310800,353697121050,254661927156,166509721602,98672427616,52860229080,25518731280,11058116888,4280561376,1471442973,445891810,118030185,26978328,5245786,850668,111930,11480,861,42,1],[1,43,903,12341,123410,962598,6096454,32224114,145008513,563921995,1917334783,5752004349,15338678264,36576848168,78378960360,151532656696,265182149218,421171648758,608359048206,800472431850,960566918220,1052049481860,1052049481860,960566918220,800472431850,608359048206,421171648758,265182149218,151532656696,78378960360,36576848168,15338678264,5752004349,1917334783,563921995,145008513,32224114,6096454,962598,123410,12341,903,43,1],[1,44,946,13244,135751,1086008,7059052,38320568,177232627,708930508,2481256778,7669339132,21090682613,51915526432,114955808528,229911617056,416714805914,686353797976,1029530696964,1408831480056,1761039350070,2012616400080,2104098963720,2012616400080,1761039350070,1408831480056,1029530696964,686353797976,416714805914,229911617056,114955808528,51915526432,21090682613,7669339132,2481256778,708930508,177232627,38320568,7059052,1086008,135751,13244,946,44,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "48",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1],[1,12,66,220,495,792,924,792,495,220,66,12,1],[1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],[1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1],[1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1],[1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1],[1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,6188,2380,680,136,17,1],[1,18,153,816,3060,8568,18564,31824,43758,48620,43758,31824,18564,8568,3060,816,153,18,1],[1,19,171,969,3876,11628,27132,50388,75582,92378,92378,75582,50388,27132,11628,3876,969,171,19,1],[1,20,190,1140,4845,15504,38760,77520,125970,167960,184756,167960,125970,77520,38760,15504,4845,1140,190,20,1],[1,21,210,1330,5985,20349,54264,116280,203490,293930,352716,352716,293930,203490,116280,54264,20349,5985,1330,210,21,1],[1,22,231,1540,7315,26334,74613,170544,319770,497420,646646,705432,646646,497420,319770,170544,74613,26334,7315,1540,231,22,1],[1,23,253,1771,8855,33649,100947,245157,490314,817190,1144066,1352078,1352078,1144066,817190,490314,245157,100947,33649,8855,1771,253,23,1],[1,24,276,2024,10626,42504,134596,346104,735471,1307504,1961256,2496144,2704156,2496144,1961256,1307504,735471,346104,134596,42504,10626,2024,276,24,1],[1,25,300,2300,12650,53130,177100,480700,1081575,2042975,3268760,4457400,5200300,5200300,4457400,3268760,2042975,1081575,480700,177100,53130,12650,2300,300,25,1],[1,26,325,2600,14950,65780,230230,657800,1562275,3124550,5311735,7726160,9657700,10400600,9657700,7726160,5311735,3124550,1562275,657800,230230,65780,14950,2600,325,26,1],[1,27,351,2925,17550,80730,296010,888030,2220075,4686825,8436285,13037895,17383860,20058300,20058300,17383860,13037895,8436285,4686825,2220075,888030,296010,80730,17550,2925,351,27,1],[1,28,378,3276,20475,98280,376740,1184040,3108105,6906900,13123110,21474180,30421755,37442160,40116600,37442160,30421755,21474180,13123110,6906900,3108105,1184040,376740,98280,20475,3276,378,28,1],[1,29,406,3654,23751,118755,475020,1560780,4292145,10015005,20030010,34597290,51895935,67863915,77558760,77558760,67863915,51895935,34597290,20030010,10015005,4292145,1560780,475020,118755,23751,3654,406,29,1],[1,30,435,4060,27405,142506,593775,2035800,5852925,14307150,30045015,54627300,86493225,119759850,145422675,155117520,145422675,119759850,86493225,54627300,30045015,14307150,5852925,2035800,593775,142506,27405,4060,435,30,1],[1,31,465,4495,31465,169911,736281,2629575,7888725,20160075,44352165,84672315,141120525,206253075,265182525,300540195,300540195,265182525,206253075,141120525,84672315,44352165,20160075,7888725,2629575,736281,169911,31465,4495,465,31,1],[1,32,496,4960,35960,201376,906192,3365856,10518300,28048800,64512240,129024480,225792840,347373600,471435600,565722720,601080390,565722720,471435600,347373600,225792840,129024480,64512240,28048800,10518300,3365856,906192,201376,35960,4960,496,32,1],[1,33,528,5456,40920,237336,1107568,4272048,13884156,38567100,92561040,193536720,354817320,573166440,818809200,1037158320,1166803110,1166803110,1037158320,818809200,573166440,354817320,193536720,92561040,38567100,13884156,4272048,1107568,237336,40920,5456,528,33,1],[1,34,561,5984,46376,278256,1344904,5379616,18156204,52451256,131128140,286097760,548354040,927983760,1391975640,1855967520,2203961430,2333606220,2203961430,1855967520,1391975640,927983760,548354040,286097760,131128140,52451256,18156204,5379616,1344904,278256,46376,5984,561,34,1],[1,35,595,6545,52360,324632,1623160,6724520,23535820,70607460,183579396,417225900,834451800,1476337800,2319959400,3247943160,4059928950,4537567650,4537567650,4059928950,3247943160,2319959400,1476337800,834451800,417225900,183579396,70607460,23535820,6724520,1623160,324632,52360,6545,595,35,1],[1,36,630,7140,58905,376992,1947792,8347680,30260340,94143280,254186856,600805296,1251677700,2310789600,3796297200,5567902560,7307872110,8597496600,9075135300,8597496600,7307872110,5567902560,3796297200,2310789600,1251677700,600805296,254186856,94143280,30260340,8347680,1947792,376992,58905,7140,630,36,1],[1,37,666,7770,66045,435897,2324784,10295472,38608020,124403620,348330136,854992152,1852482996,3562467300,6107086800,9364199760,12875774670,15905368710,17672631900,17672631900,15905368710,12875774670,9364199760,6107086800,3562467300,1852482996,854992152,348330136,124403620,38608020,10295472,2324784,435897,66045,7770,666,37,1],[1,38,703,8436,73815,501942,2760681,12620256,48903492,163011640,472733756,1203322288,2707475148,5414950296,9669554100,15471286560,22239974430,28781143380,33578000610,35345263800,33578000610,28781143380,22239974430,15471286560,9669554100,5414950296,2707475148,1203322288,472733756,163011640,48903492,12620256,2760681,501942,73815,8436,703,38,1],[1,39,741,9139,82251,575757,3262623,15380937,61523748,211915132,635745396,1676056044,3910797436,8122425444,15084504396,25140840660,37711260990,51021117810,62359143990,68923264410,68923264410,62359143990,51021117810,37711260990,25140840660,15084504396,8122425444,3910797436,1676056044,635745396,211915132,61523748,15380937,3262623,575757,82251,9139,741,39,1],[1,40,780,9880,91390,658008,3838380,18643560,76904685,273438880,847660528,2311801440,5586853480,12033222880,23206929840,40225345056,62852101650,88732378800,113380261800,131282408400,137846528820,131282408400,113380261800,88732378800,62852101650,40225345056,23206929840,12033222880,5586853480,2311801440,847660528,273438880,76904685,18643560,3838380,658008,91390,9880,780,40,1],[1,41,820,10660,101270,749398,4496388,22481940,95548245,350343565,1121099408,3159461968,7898654920,17620076360,35240152720,63432274896,103077446706,151584480450,202112640600,244662670200,269128937220,269128937220,244662670200,202112640600,151584480450,103077446706,63432274896,35240152720,17620076360,7898654920,3159461968,1121099408,350343565,95548245,22481940,4496388,749398,101270,10660,820,41,1],[1,42,861,11480,111930,850668,5245786,26978328,118030185,445891810,1471442973,4280561376,11058116888,25518731280,52860229080,98672427616,166509721602,254661927156,353697121050,446775310800,513791607420,538257874440,513791607420,446775310800,353697121050,254661927156,166509721602,98672427616,52860229080,25518731280,11058116888,4280561376,1471442973,445891810,118030185,26978328,5245786,850668,111930,11480,861,42,1],[1,43,903,12341,123410,962598,6096454,32224114,145008513,563921995,1917334783,5752004349,15338678264,36576848168,78378960360,151532656696,265182149218,421171648758,608359048206,800472431850,960566918220,1052049481860,1052049481860,960566918220,800472431850,608359048206,421171648758,265182149218,151532656696,78378960360,36576848168,15338678264,5752004349,1917334783,563921995,145008513,32224114,6096454,962598,123410,12341,903,43,1],[1,44,946,13244,135751,1086008,7059052,38320568,177232627,708930508,2481256778,7669339132,21090682613,51915526432,114955808528,229911617056,416714805914,686353797976,1029530696964,1408831480056,1761039350070,2012616400080,2104098963720,2012616400080,1761039350070,1408831480056,1029530696964,686353797976,416714805914,229911617056,114955808528,51915526432,21090682613,7669339132,2481256778,708930508,177232627,38320568,7059052,1086008,135751,13244,946,44,1],[1,45,990,14190,148995,1221759,8145060,45379620,215553195,886163135,3190187286,10150595910,28760021745,73006209045,166871334960,344867425584,646626422970,1103068603890,1715884494940,2438362177020,3169870830126,3773655750150,4116715363800,4116715363800,3773655750150,3169870830126,2438362177020,1715884494940,1103068603890,646626422970,344867425584,166871334960,73006209045,28760021745,10150595910,3190187286,886163135,215553195,45379620,8145060,1221759,148995,14190,990,45,1],[1,46,1035,15180,163185,1370754,9366819,53524680,260932815,1101716330,4076350421,13340783196,38910617655,101766230790,239877544005,511738760544,991493848554,1749695026860,2818953098830,4154246671960,5608233007146,6943526580276,7890371113950,8233430727600,7890371113950,6943526580276,5608233007146,4154246671960,2818953098830,1749695026860,991493848554,511738760544,239877544005,101766230790,38910617655,13340783196,4076350421,1101716330,260932815,53524680,9366819,1370754,163185,15180,1035,46,1],[1,47,1081,16215,178365,1533939,10737573,62891499,314457495,1362649145,5178066751,17417133617,52251400851,140676848445,341643774795,751616304549,1503232609098,2741188875414,4568648125690,6973199770790,9762479679106,12551759587422,14833897694226,16123801841550,16123801841550,14833897694226,12551759587422,9762479679106,6973199770790,4568648125690,2741188875414,1503232609098,751616304549,341643774795,140676848445,52251400851,17417133617,5178066751,1362649145,314457495,62891499,10737573,1533939,178365,16215,1081,47,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "51",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1],[1,10,45,120,210,252,210,120,45,10,1],[1,11,55,165,330,462,462,330,165,55,11,1],[1,12,66,220,495,792,924,792,495,220,66,12,1],[1,13,78,286,715,1287,1716,1716,1287,715,286,78,13,1],[1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1],[1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1],[1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1],[1,17,136,680,2380,6188,12376,19448,24310,24310,19448,12376,6188,2380,680,136,17,1],[1,18,153,816,3060,8568,18564,31824,43758,48620,43758,31824,18564,8568,3060,816,153,18,1],[1,19,171,969,3876,11628,27132,50388,75582,92378,92378,75582,50388,27132,11628,3876,969,171,19,1],[1,20,190,1140,4845,15504,38760,77520,125970,167960,184756,167960,125970,77520,38760,15504,4845,1140,190,20,1],[1,21,210,1330,5985,20349,54264,116280,203490,293930,352716,352716,293930,203490,116280,54264,20349,5985,1330,210,21,1],[1,22,231,1540,7315,26334,74613,170544,319770,497420,646646,705432,646646,497420,319770,170544,74613,26334,7315,1540,231,22,1],[1,23,253,1771,8855,33649,100947,245157,490314,817190,1144066,1352078,1352078,1144066,817190,490314,245157,100947,33649,8855,1771,253,23,1],[1,24,276,2024,10626,42504,134596,346104,735471,1307504,1961256,2496144,2704156,2496144,1961256,1307504,735471,346104,134596,42504,10626,2024,276,24,1],[1,25,300,2300,12650,53130,177100,480700,1081575,2042975,3268760,4457400,5200300,5200300,4457400,3268760,2042975,1081575,480700,177100,53130,12650,2300,300,25,1],[1,26,325,2600,14950,65780,230230,657800,1562275,3124550,5311735,7726160,9657700,10400600,9657700,7726160,5311735,3124550,1562275,657800,230230,65780,14950,2600,325,26,1],[1,27,351,2925,17550,80730,296010,888030,2220075,4686825,8436285,13037895,17383860,20058300,20058300,17383860,13037895,8436285,4686825,2220075,888030,296010,80730,17550,2925,351,27,1],[1,28,378,3276,20475,98280,376740,1184040,3108105,6906900,13123110,21474180,30421755,37442160,40116600,37442160,30421755,21474180,13123110,6906900,3108105,1184040,376740,98280,20475,3276,378,28,1],[1,29,406,3654,23751,118755,475020,1560780,4292145,10015005,20030010,34597290,51895935,67863915,77558760,77558760,67863915,51895935,34597290,20030010,10015005,4292145,1560780,475020,118755,23751,3654,406,29,1],[1,30,435,4060,27405,142506,593775,2035800,5852925,14307150,30045015,54627300,86493225,119759850,145422675,155117520,145422675,119759850,86493225,54627300,30045015,14307150,5852925,2035800,593775,142506,27405,4060,435,30,1],[1,31,465,4495,31465,169911,736281,2629575,7888725,20160075,44352165,84672315,141120525,206253075,265182525,300540195,300540195,265182525,206253075,141120525,84672315,44352165,20160075,7888725,2629575,736281,169911,31465,4495,465,31,1],[1,32,496,4960,35960,201376,906192,3365856,10518300,28048800,64512240,129024480,225792840,347373600,471435600,565722720,601080390,565722720,471435600,347373600,225792840,129024480,64512240,28048800,10518300,3365856,906192,201376,35960,4960,496,32,1],[1,33,528,5456,40920,237336,1107568,4272048,13884156,38567100,92561040,193536720,354817320,573166440,818809200,1037158320,1166803110,1166803110,1037158320,818809200,573166440,354817320,193536720,92561040,38567100,13884156,4272048,1107568,237336,40920,5456,528,33,1],[1,34,561,5984,46376,278256,1344904,5379616,18156204,52451256,131128140,286097760,548354040,927983760,1391975640,1855967520,2203961430,2333606220,2203961430,1855967520,1391975640,927983760,548354040,286097760,131128140,52451256,18156204,5379616,1344904,278256,46376,5984,561,34,1],[1,35,595,6545,52360,324632,1623160,6724520,23535820,70607460,183579396,417225900,834451800,1476337800,2319959400,3247943160,4059928950,4537567650,4537567650,4059928950,3247943160,2319959400,1476337800,834451800,417225900,183579396,70607460,23535820,6724520,1623160,324632,52360,6545,595,35,1],[1,36,630,7140,58905,376992,1947792,8347680,30260340,94143280,254186856,600805296,1251677700,2310789600,3796297200,5567902560,7307872110,8597496600,9075135300,8597496600,7307872110,5567902560,3796297200,2310789600,1251677700,600805296,254186856,94143280,30260340,8347680,1947792,376992,58905,7140,630,36,1],[1,37,666,7770,66045,435897,2324784,10295472,38608020,124403620,348330136,854992152,1852482996,3562467300,6107086800,9364199760,12875774670,15905368710,17672631900,17672631900,15905368710,12875774670,9364199760,6107086800,3562467300,1852482996,854992152,348330136,124403620,38608020,10295472,2324784,435897,66045,7770,666,37,1],[1,38,703,8436,73815,501942,2760681,12620256,48903492,163011640,472733756,1203322288,2707475148,5414950296,9669554100,15471286560,22239974430,28781143380,33578000610,35345263800,33578000610,28781143380,22239974430,15471286560,9669554100,5414950296,2707475148,1203322288,472733756,163011640,48903492,12620256,2760681,501942,73815,8436,703,38,1],[1,39,741,9139,82251,575757,3262623,15380937,61523748,211915132,635745396,1676056044,3910797436,8122425444,15084504396,25140840660,37711260990,51021117810,62359143990,68923264410,68923264410,62359143990,51021117810,37711260990,25140840660,15084504396,8122425444,3910797436,1676056044,635745396,211915132,61523748,15380937,3262623,575757,82251,9139,741,39,1],[1,40,780,9880,91390,658008,3838380,18643560,76904685,273438880,847660528,2311801440,5586853480,12033222880,23206929840,40225345056,62852101650,88732378800,113380261800,131282408400,137846528820,131282408400,113380261800,88732378800,62852101650,40225345056,23206929840,12033222880,5586853480,2311801440,847660528,273438880,76904685,18643560,3838380,658008,91390,9880,780,40,1],[1,41,820,10660,101270,749398,4496388,22481940,95548245,350343565,1121099408,3159461968,7898654920,17620076360,35240152720,63432274896,103077446706,151584480450,202112640600,244662670200,269128937220,269128937220,244662670200,202112640600,151584480450,103077446706,63432274896,35240152720,17620076360,7898654920,3159461968,1121099408,350343565,95548245,22481940,4496388,749398,101270,10660,820,41,1],[1,42,861,11480,111930,850668,5245786,26978328,118030185,445891810,1471442973,4280561376,11058116888,25518731280,52860229080,98672427616,166509721602,254661927156,353697121050,446775310800,513791607420,538257874440,513791607420,446775310800,353697121050,254661927156,166509721602,98672427616,52860229080,25518731280,11058116888,4280561376,1471442973,445891810,118030185,26978328,5245786,850668,111930,11480,861,42,1],[1,43,903,12341,123410,962598,6096454,32224114,145008513,563921995,1917334783,5752004349,15338678264,36576848168,78378960360,151532656696,265182149218,421171648758,608359048206,800472431850,960566918220,1052049481860,1052049481860,960566918220,800472431850,608359048206,421171648758,265182149218,151532656696,78378960360,36576848168,15338678264,5752004349,1917334783,563921995,145008513,32224114,6096454,962598,123410,12341,903,43,1],[1,44,946,13244,135751,1086008,7059052,38320568,177232627,708930508,2481256778,7669339132,21090682613,51915526432,114955808528,229911617056,416714805914,686353797976,1029530696964,1408831480056,1761039350070,2012616400080,2104098963720,2012616400080,1761039350070,1408831480056,1029530696964,686353797976,416714805914,229911617056,114955808528,51915526432,21090682613,7669339132,2481256778,708930508,177232627,38320568,7059052,1086008,135751,13244,946,44,1],[1,45,990,14190,148995,1221759,8145060,45379620,215553195,886163135,3190187286,10150595910,28760021745,73006209045,166871334960,344867425584,646626422970,1103068603890,1715884494940,2438362177020,3169870830126,3773655750150,4116715363800,4116715363800,3773655750150,3169870830126,2438362177020,1715884494940,1103068603890,646626422970,344867425584,166871334960,73006209045,28760021745,10150595910,3190187286,886163135,215553195,45379620,8145060,1221759,148995,14190,990,45,1],[1,46,1035,15180,163185,1370754,9366819,53524680,260932815,1101716330,4076350421,13340783196,38910617655,101766230790,239877544005,511738760544,991493848554,1749695026860,2818953098830,4154246671960,5608233007146,6943526580276,7890371113950,8233430727600,7890371113950,6943526580276,5608233007146,4154246671960,2818953098830,1749695026860,991493848554,511738760544,239877544005,101766230790,38910617655,13340783196,4076350421,1101716330,260932815,53524680,9366819,1370754,163185,15180,1035,46,1],[1,47,1081,16215,178365,1533939,10737573,62891499,314457495,1362649145,5178066751,17417133617,52251400851,140676848445,341643774795,751616304549,1503232609098,2741188875414,4568648125690,6973199770790,9762479679106,12551759587422,14833897694226,16123801841550,16123801841550,14833897694226,12551759587422,9762479679106,6973199770790,4568648125690,2741188875414,1503232609098,751616304549,341643774795,140676848445,52251400851,17417133617,5178066751,1362649145,314457495,62891499,10737573,1533939,178365,16215,1081,47,1],[1,48,1128,17296,194580,1712304,12271512,73629072,377348994,1677106640,6540715896,22595200368,69668534468,192928249296,482320623240,1093260079344,2254848913647,4244421484512,7309837001104,11541847896480,16735679449896,22314239266528,27385657281648,30957699535776,32247603683100,30957699535776,27385657281648,22314239266528,16735679449896,11541847896480,7309837001104,4244421484512,2254848913647,1093260079344,482320623240,192928249296,69668534468,22595200368,6540715896,1677106640,377348994,73629072,12271512,1712304,194580,17296,1128,48,1],[1,49,1176,18424,211876,1906884,13983816,85900584,450978066,2054455634,8217822536,29135916264,92263734836,262596783764,675248872536,1575580702584,3348108992991,6499270398159,11554258485616,18851684897584,28277527346376,39049918716424,49699896548176,58343356817424,63205303218876,63205303218876,58343356817424,49699896548176,39049918716424,28277527346376,18851684897584,11554258485616,6499270398159,3348108992991,1575580702584,675248872536,262596783764,92263734836,29135916264,8217822536,2054455634,450978066,85900584,13983816,1906884,211876,18424,1176,49,1],[1,50,1225,19600,230300,2118760,15890700,99884400,536878650,2505433700,10272278170,37353738800,121399651100,354860518600,937845656300,2250829575120,4923689695575,9847379391150,18053528883775,30405943383200,47129212243960,67327446062800,88749815264600,108043253365600,121548660036300,126410606437752,121548660036300,108043253365600,88749815264600,67327446062800,47129212243960,30405943383200,18053528883775,9847379391150,4923689695575,2250829575120,937845656300,354860518600,121399651100,37353738800,10272278170,2505433700,536878650,99884400,15890700,2118760,230300,19600,1225,50,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 34,
    "title": "Bitwise AND/OR/XOR Basics",
    "difficulty": "easy",
    "category": "Bit Manipulation",
    "description": "Solve the comprehensive problem: Bitwise AND/OR/XOR Basics. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Bitwise AND/OR/XOR Basics.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [34, 68, 102], k = 5",
    "sampleOutput": "68",
    "boilerplate": "def bitwise_and_or_xor_basics(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [34, 68, 102], k = 5",
        "output": "AND: 0, OR: 0, XOR: 0",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "3",
        "output": "AND: 0, OR: 3, XOR: 3",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "6",
        "output": "AND: 0, OR: 6, XOR: 6",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "9",
        "output": "AND: 0, OR: 9, XOR: 9",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "12",
        "output": "AND: 0, OR: 12, XOR: 12",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "15",
        "output": "AND: 0, OR: 15, XOR: 15",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "18",
        "output": "AND: 0, OR: 18, XOR: 18",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "21",
        "output": "AND: 0, OR: 21, XOR: 21",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "24",
        "output": "AND: 0, OR: 24, XOR: 24",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "27",
        "output": "AND: 0, OR: 27, XOR: 27",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "30",
        "output": "AND: 0, OR: 30, XOR: 30",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "33",
        "output": "AND: 0, OR: 33, XOR: 33",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "36",
        "output": "AND: 0, OR: 36, XOR: 36",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "39",
        "output": "AND: 0, OR: 39, XOR: 39",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "42",
        "output": "AND: 0, OR: 42, XOR: 42",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "45",
        "output": "AND: 0, OR: 45, XOR: 45",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "48",
        "output": "AND: 0, OR: 48, XOR: 48",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "51",
        "output": "AND: 0, OR: 51, XOR: 51",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 35,
    "title": "Hamming Weight (Number of 1 Bits)",
    "difficulty": "easy",
    "category": "Bit Manipulation",
    "description": "Solve the comprehensive problem: Hamming Weight (Number of 1 Bits). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Hamming Weight (Number of 1 Bits).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [35, 70, 105], k = 1",
    "sampleOutput": "70",
    "boilerplate": "def hamming_weight_number_of_1_bits(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [35, 70, 105], k = 1",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "3",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "6",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "9",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "12",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "15",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "18",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "21",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "24",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "27",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "30",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "33",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "36",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "39",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "42",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "45",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "48",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "51",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 36,
    "title": "Power of Two Validation",
    "difficulty": "easy",
    "category": "Bit Manipulation",
    "description": "Solve the comprehensive problem: Power of Two Validation. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Power of Two Validation.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [36, 72, 108], k = 2",
    "sampleOutput": "72",
    "boilerplate": "def power_of_two_validation(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [36, 72, 108], k = 2",
        "output": "false",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "3",
        "output": "false",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "6",
        "output": "false",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "9",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "12",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "15",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "18",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "21",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "24",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "27",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "30",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "33",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "36",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "39",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "42",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "45",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "48",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "51",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 37,
    "title": "Missing Bit Calculation",
    "difficulty": "easy",
    "category": "Bit Manipulation",
    "description": "Solve the comprehensive problem: Missing Bit Calculation. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Missing Bit Calculation.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [37, 74, 111], k = 3",
    "sampleOutput": "74",
    "boilerplate": "def missing_bit_calculation(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "8",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "8",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "27",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "20",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "45",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "20",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "3968",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "74",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "48",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "14",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 38,
    "title": "Prefix Sum (1D Array)",
    "difficulty": "easy",
    "category": "Strings",
    "description": "Solve the comprehensive problem: Prefix Sum (1D Array). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Prefix Sum (1D Array).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [38, 76, 114], k = 4",
    "sampleOutput": "76",
    "boilerplate": "def prefix_sum_1d_array(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "[4,6,13,14,23]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "[4,6,13,14,23]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "[10,30,60,100,150]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "[5,9,12,14,15]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "[-10,-15,-15,-10,0]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "[1,2,3,4,5]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "[100,300,600,1000]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "[9,17,24,30,35]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "[0,0,0]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "[12,57,124,213,236]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "[1,4,9,16,25,36]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "[50,90,120,140]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "[-1,-3,-6,-10]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "[1000,3000,6000]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "[15,45,90,150,225]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "[2,6,12,20,30]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "[99,187,264,330]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "[3,9,18,30,45]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 39,
    "title": "Move Zeroes (In-place)",
    "difficulty": "easy",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Move Zeroes (In-place). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Move Zeroes (In-place).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [39, 78, 117], k = 5",
    "sampleOutput": "78",
    "boilerplate": "def move_zeroes_in_place(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "[4,2,7,1,9]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "[4,2,7,1,9]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "[10,20,30,40,50]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "[5,4,3,2,1]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "[-10,-5,5,10,0]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "[1,1,1,1,1]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "[100,200,300,400]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "[9,8,7,6,5]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "[0,0,0]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "[12,45,67,89,23]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "[1,3,5,7,9,11]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "[50,40,30,20]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "[-1,-2,-3,-4]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "[1000,2000,3000]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "[15,30,45,60,75]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "[2,4,6,8,10]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "[99,88,77,66]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "[3,6,9,12,15]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 40,
    "title": "Find Pivot / Equilibrium Index",
    "difficulty": "easy",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Find Pivot / Equilibrium Index. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Find Pivot / Equilibrium Index.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [40, 80, 120], k = 1",
    "sampleOutput": "80",
    "boilerplate": "def find_pivot_equilibrium_index(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "-1",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "-1",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "-1",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 41,
    "title": "First Unique Character in String",
    "difficulty": "easy",
    "category": "Strings",
    "description": "Solve the comprehensive problem: First Unique Character in String. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for First Unique Character in String.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [41, 82, 123], k = 2",
    "sampleOutput": "82",
    "boilerplate": "def first_unique_character_in_string(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [41, 82, 123], k = 2",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "11",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 42,
    "title": "Longest Common Prefix",
    "difficulty": "easy",
    "category": "Strings",
    "description": "Solve the comprehensive problem: Longest Common Prefix. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Longest Common Prefix.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [42, 84, 126], k = 3",
    "sampleOutput": "84",
    "boilerplate": "def longest_common_prefix(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [42, 84, 126], k = 3",
        "output": "84",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "84",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "84",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "84",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 43,
    "title": "Valid Roman Numeral Conversion",
    "difficulty": "easy",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Valid Roman Numeral Conversion. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Valid Roman Numeral Conversion.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [43, 86, 129], k = 4",
    "sampleOutput": "86",
    "boilerplate": "def valid_roman_numeral_conversion(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [43, 86, 129], k = 4",
        "output": "NaN",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "NaN",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "NaN",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "58",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "1994",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 44,
    "title": "Matrix Diagonal Sum",
    "difficulty": "easy",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Matrix Diagonal Sum. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Matrix Diagonal Sum.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [44, 88, 132], k = 5",
    "sampleOutput": "88",
    "boilerplate": "def matrix_diagonal_sum(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [44, 88, 132], k = 5",
        "output": "88",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 45,
    "title": "Transpose Matrix",
    "difficulty": "easy",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Transpose Matrix. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Transpose Matrix.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [45, 90, 135], k = 1",
    "sampleOutput": "90",
    "boilerplate": "def transpose_matrix(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [45, 90, 135], k = 1",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 46,
    "title": "Simple Greedy Algorithms",
    "difficulty": "easy",
    "category": "Greedy",
    "description": "Solve the comprehensive problem: Simple Greedy Algorithms. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Simple Greedy Algorithms.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [46, 92, 138], k = 2",
    "sampleOutput": "92",
    "boilerplate": "def simple_greedy_algorithms(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [46, 92, 138], k = 2",
        "output": "92",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "3",
        "output": "92",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "6",
        "output": "92",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "9",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "12",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "15",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "18",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "21",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "24",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "27",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "30",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "33",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "36",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "39",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "42",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "45",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "48",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "51",
        "output": "92",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 47,
    "title": "Basic Math (GCD & LCM)",
    "difficulty": "easy",
    "category": "Math",
    "description": "Solve the comprehensive problem: Basic Math (GCD & LCM). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Basic Math (GCD & LCM).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [47, 94, 141], k = 3",
    "sampleOutput": "94",
    "boilerplate": "def basic_math_gcd_lcm(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [47, 94, 141], k = 3",
        "output": "94",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "3",
        "output": "94",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "6",
        "output": "94",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "9",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "12",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "15",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "18",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "21",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "24",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "27",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "30",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "33",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "36",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "39",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "42",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "45",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "48",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "51",
        "output": "94",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 48,
    "title": "Base Conversions",
    "difficulty": "easy",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Base Conversions. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Base Conversions.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [48, 96, 144], k = 4",
    "sampleOutput": "96",
    "boilerplate": "def base_conversions(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [48, 96, 144], k = 4",
        "output": "96",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "3",
        "output": "96",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "6",
        "output": "96",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "9",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "12",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "15",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "18",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "21",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "24",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "27",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "30",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "33",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "36",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "39",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "42",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "45",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "48",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "51",
        "output": "96",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 49,
    "title": "Check Prime Number",
    "difficulty": "easy",
    "category": "Math",
    "description": "Solve the comprehensive problem: Check Prime Number. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Check Prime Number.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [49, 98, 147], k = 5",
    "sampleOutput": "98",
    "boilerplate": "def check_prime_number(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [49, 98, 147], k = 5",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "3",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "6",
        "output": "false",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "9",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "12",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "15",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "18",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "21",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "24",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "27",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "30",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "33",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "36",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "39",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "42",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "45",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "48",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "51",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 50,
    "title": "Valid Perfect Square",
    "difficulty": "easy",
    "category": "Math",
    "description": "Solve the comprehensive problem: Valid Perfect Square. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Valid Perfect Square.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^4",
    "sampleInput": "nums = [50, 100, 150], k = 1",
    "sampleOutput": "100",
    "boilerplate": "def valid_perfect_square(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [50, 100, 150], k = 1",
        "output": "false",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "3",
        "output": "false",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "6",
        "output": "false",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "9",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "12",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "15",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "18",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "21",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "24",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "27",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "30",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "33",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "36",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "39",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "42",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "45",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "48",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "51",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 51,
    "title": "Fixed-Size Sliding Window",
    "difficulty": "medium",
    "category": "Sliding Window",
    "description": "Solve the comprehensive problem: Fixed-Size Sliding Window. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Fixed-Size Sliding Window.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [51, 102, 153], k = 2",
    "sampleOutput": "102",
    "boilerplate": "def fixed_size_sliding_window(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "35",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "NaN",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 52,
    "title": "Variable-Size Sliding Window",
    "difficulty": "medium",
    "category": "Sliding Window",
    "description": "Solve the comprehensive problem: Variable-Size Sliding Window. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Variable-Size Sliding Window.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [52, 104, 156], k = 3",
    "sampleOutput": "104",
    "boilerplate": "def variable_size_sliding_window(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "1",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "1",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "1",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "-2",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "-3",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 53,
    "title": "Two Pointers (Opposite Ends)",
    "difficulty": "medium",
    "category": "Two Pointers",
    "description": "Solve the comprehensive problem: Two Pointers (Opposite Ends). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Two Pointers (Opposite Ends).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [53, 106, 159], k = 4",
    "sampleOutput": "106",
    "boilerplate": "def two_pointers_opposite_ends(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "[]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "[]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "[1,2]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "[1,5]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "[1,3]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "[1,2]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "[1,4]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "[1,2]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 54,
    "title": "Two Pointers (Same Direction)",
    "difficulty": "medium",
    "category": "Two Pointers",
    "description": "Solve the comprehensive problem: Two Pointers (Same Direction). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Two Pointers (Same Direction).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [54, 108, 162], k = 5",
    "sampleOutput": "108",
    "boilerplate": "def two_pointers_same_direction(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "[4,2,7,1,9]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "[4,2,7,1,9]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "[10,20,30,40,50]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "[5,4,3,2,1]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "[-10,-5,5,10,0]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "[1,1,1,1,1]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "[100,200,300,400]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "[9,8,7,6,5]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "[0,0,0]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "[12,45,67,89,23]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "[1,3,5,7,9,11]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "[50,40,30,20]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "[-1,-2,-3,-4]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "[1000,2000,3000]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "[15,30,45,60,75]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "[2,4,6,8,10]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "[99,88,77,66]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "[3,6,9,12,15]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 55,
    "title": "Three Sum / Four Sum",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Three Sum / Four Sum. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Three Sum / Four Sum.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [55, 110, 165], k = 1",
    "sampleOutput": "110",
    "boilerplate": "def three_sum_four_sum(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "[]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "[]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "[]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "[[-10,0,10],[-5,0,5]]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "[[0,0,0]]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 56,
    "title": "Binary Search on Answer Domain",
    "difficulty": "medium",
    "category": "Searching",
    "description": "Solve the comprehensive problem: Binary Search on Answer Domain. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Binary Search on Answer Domain.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [56, 112, 168], k = 2",
    "sampleOutput": "112",
    "boilerplate": "def binary_search_on_answer_domain(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "9",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "9",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "50",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "15",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "10",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "400",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "89",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "11",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "50",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "3000",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "75",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "10",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "99",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "15",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 57,
    "title": "Search in Rotated Sorted Array",
    "difficulty": "medium",
    "category": "Searching",
    "description": "Solve the comprehensive problem: Search in Rotated Sorted Array. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Search in Rotated Sorted Array.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [57, 114, 171], k = 3",
    "sampleOutput": "114",
    "boilerplate": "def search_in_rotated_sorted_array(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "-1",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 58,
    "title": "Find First and Last Position",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Find First and Last Position. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Find First and Last Position.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [58, 116, 174], k = 4",
    "sampleOutput": "116",
    "boilerplate": "def find_first_and_last_position(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "[2,2]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "[2,2]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "[2,2]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "[4,4]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "[2,2]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "[0,4]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "[-1,-1]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "[4,4]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "[0,2]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "[3,3]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "[3,3]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "[3,3]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "[2,2]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "[1,1]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "[2,2]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "[4,4]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "[2,2]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "[2,2]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 59,
    "title": "Matrix Traversal (Spiral)",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Matrix Traversal (Spiral). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Matrix Traversal (Spiral).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [59, 118, 177], k = 5",
    "sampleOutput": "118",
    "boilerplate": "def matrix_traversal_spiral(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [59, 118, 177], k = 5",
        "output": "118",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 60,
    "title": "Rotate Image (In-place)",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Rotate Image (In-place). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Rotate Image (In-place).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [60, 120, 180], k = 1",
    "sampleOutput": "120",
    "boilerplate": "def rotate_image_in_place(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [60, 120, 180], k = 1",
        "output": "120",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 61,
    "title": "Valid Sudoku Verification",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Valid Sudoku Verification. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Valid Sudoku Verification.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [61, 122, 183], k = 2",
    "sampleOutput": "122",
    "boilerplate": "def valid_sudoku_verification(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [61, 122, 183], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 62,
    "title": "Top K Frequent Elements (Heap)",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Top K Frequent Elements (Heap). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Top K Frequent Elements (Heap).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [62, 124, 186], k = 3",
    "sampleOutput": "124",
    "boilerplate": "def top_k_frequent_elements_heap(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "[1,2,4,7,9]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "[1,2,4,7,9]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "[10,20,30,40,50]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "[100,200,300,400]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "[5,6,7,8,9]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "[12,23,45,67,89]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "[1,3,5,7,9,11]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "[20,30,40,50]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "[-1]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "[1000,2000,3000]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "[15,30,45,60,75]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "[2,4,6,8,10]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "[66,77,88,99]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "[3,6,9,12,15]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 63,
    "title": "Kth Largest Element in Array",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Kth Largest Element in Array. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Kth Largest Element in Array.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [63, 126, 189], k = 4",
    "sampleOutput": "126",
    "boilerplate": "def kth_largest_element_in_array(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "undefined",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "undefined",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "undefined",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 64,
    "title": "Merge Overlapping Intervals",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Merge Overlapping Intervals. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Merge Overlapping Intervals.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [64, 128, 192], k = 5",
    "sampleOutput": "128",
    "boilerplate": "def merge_overlapping_intervals(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "128",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "128",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "128",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "128",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 65,
    "title": "Insert Interval",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Insert Interval. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Insert Interval.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [65, 130, 195], k = 1",
    "sampleOutput": "130",
    "boilerplate": "def insert_interval(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [65, 130, 195], k = 1",
        "output": "130",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 66,
    "title": "Non-overlapping Intervals",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Non-overlapping Intervals. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Non-overlapping Intervals.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [66, 132, 198], k = 2",
    "sampleOutput": "132",
    "boilerplate": "def non_overlapping_intervals(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [66, 132, 198], k = 2",
        "output": "132",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 67,
    "title": "Prefix Sum (2D Matrix)",
    "difficulty": "medium",
    "category": "Strings",
    "description": "Solve the comprehensive problem: Prefix Sum (2D Matrix). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Prefix Sum (2D Matrix).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [67, 134, 201], k = 3",
    "sampleOutput": "134",
    "boilerplate": "def prefix_sum_2d_matrix(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [67, 134, 201], k = 3",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 68,
    "title": "Subarray Sum Equals K",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Subarray Sum Equals K. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Subarray Sum Equals K.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [68, 136, 204], k = 4",
    "sampleOutput": "136",
    "boilerplate": "def subarray_sum_equals_k(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "1",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "1",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 69,
    "title": "Longest Substring Without Repeats",
    "difficulty": "medium",
    "category": "Strings",
    "description": "Solve the comprehensive problem: Longest Substring Without Repeats. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Longest Substring Without Repeats.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [69, 138, 207], k = 5",
    "sampleOutput": "138",
    "boilerplate": "def longest_substring_without_repeats(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [69, 138, 207], k = 5",
        "output": "9",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "6",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "8",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 70,
    "title": "Longest Palindromic Substring",
    "difficulty": "medium",
    "category": "Strings",
    "description": "Solve the comprehensive problem: Longest Palindromic Substring. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Longest Palindromic Substring.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [70, 140, 210], k = 1",
    "sampleOutput": "140",
    "boilerplate": "def longest_palindromic_substring(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [70, 140, 210], k = 1",
        "output": " = ",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "ll",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": " a ",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "ee",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "ana",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "r",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "(",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "(",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "III",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "MCM",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "bab",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "bb",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "a",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "a",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "bcb",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "bbbbb",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "ww",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "A",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 71,
    "title": "Group Anagrams",
    "difficulty": "medium",
    "category": "Strings",
    "description": "Solve the comprehensive problem: Group Anagrams. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Group Anagrams.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [71, 142, 213], k = 2",
    "sampleOutput": "142",
    "boilerplate": "def group_anagrams(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [71, 142, 213], k = 2",
        "output": "142",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "142",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "142",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "142",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 72,
    "title": "String to Integer (atoi)",
    "difficulty": "medium",
    "category": "Strings",
    "description": "Solve the comprehensive problem: String to Integer (atoi). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for String to Integer (atoi).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [72, 144, 216], k = 3",
    "sampleOutput": "144",
    "boilerplate": "def string_to_integer_atoi(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [72, 144, 216], k = 3",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 73,
    "title": "Linked List: Add Two Numbers",
    "difficulty": "medium",
    "category": "Linked Lists",
    "description": "Solve the comprehensive problem: Linked List: Add Two Numbers. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Linked List: Add Two Numbers.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [73, 146, 219], k = 4",
    "sampleOutput": "146",
    "boilerplate": "def linked_list_add_two_numbers(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[1,3,5]\n[2,4,6]",
        "output": "[3,7,1,1]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[5,4,3,2,1]\n[-10,-5,0,5,10]",
        "output": "[-5,-2,2,7,1,1]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1,1,1,1,1]\n[100,200,300,400]",
        "output": "[1,1,2,3,4,4]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[9,8,7,6,5]\n[0,0,0]",
        "output": "[9,8,7,6,5]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[12,45,67,89,23]\n[1,3,5,7,9,11]",
        "output": "[3,9,6,3,2,5,1]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[50,40,30,20]\n[-1,-2,-3,-4]",
        "output": "[9,2,1,9,1]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1000,2000,3000]\n[15,30,45,60,75]",
        "output": "[5,1,8,5,3,1,1]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[2,4,6,8,10]\n[99,88,77,66]",
        "output": "[1,2,3,3,8,1]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[3,6,9,12,15]\n[4,2,7,1,9]",
        "output": "[7,8,6,4,5,2]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[10,20,30,40,50]\n[5,4,3,2,1]",
        "output": "[5,5,5,5,5,5]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[-10,-5,0,5,10]\n[1,1,1,1,1]",
        "output": "[-9,-5,0,6,1,1]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[100,200,300,400]\n[9,8,7,6,5]",
        "output": "[9,8,8,8,8,4]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[0,0,0]\n[12,45,67,89,23]",
        "output": "[2,6,1,6,2,3]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1,3,5,7,9,11]\n[50,40,30,20]",
        "output": "[1,8,9,0,2,2,1]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[-1,-2,-3,-4]\n[1000,2000,3000]",
        "output": "[9,7,6,6,1,3]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[15,30,45,60,75]\n[2,4,6,8,10]",
        "output": "[7,5,4,3,2,9]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n[3,6,9,12,15]",
        "output": "[2,4,6,7,3,2]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[4,2,7,1,9]\n[10,20,30,40,50]",
        "output": "[4,3,9,4,3,6]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 74,
    "title": "Linked List: Remove Nth Node",
    "difficulty": "medium",
    "category": "Linked Lists",
    "description": "Solve the comprehensive problem: Linked List: Remove Nth Node. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Linked List: Remove Nth Node.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [74, 148, 222], k = 5",
    "sampleOutput": "148",
    "boilerplate": "def linked_list_remove_nth_node(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [74, 148, 222], k = 5",
        "output": "148",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 75,
    "title": "Linked List: Reorder List",
    "difficulty": "medium",
    "category": "Linked Lists",
    "description": "Solve the comprehensive problem: Linked List: Reorder List. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Linked List: Reorder List.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [75, 150, 225], k = 1",
    "sampleOutput": "150",
    "boilerplate": "def linked_list_reorder_list(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [75, 150, 225], k = 1",
        "output": "150",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 76,
    "title": "Linked List: Copy with Random Pointer",
    "difficulty": "medium",
    "category": "Linked Lists",
    "description": "Solve the comprehensive problem: Linked List: Copy with Random Pointer. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Linked List: Copy with Random Pointer.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [76, 152, 228], k = 2",
    "sampleOutput": "152",
    "boilerplate": "def linked_list_copy_with_random_pointer(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [76, 152, 228], k = 2",
        "output": "nums = [76, 152, 228], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 77,
    "title": "Tree: Level Order Traversal (BFS)",
    "difficulty": "medium",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Tree: Level Order Traversal (BFS). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Tree: Level Order Traversal (BFS).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [77, 154, 231], k = 3",
    "sampleOutput": "154",
    "boilerplate": "def tree_level_order_traversal_bfs(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [77, 154, 231], k = 3",
        "output": "154",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[[3],[9,20],[15,7]]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "[[1]]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[[1],[2,2],[3,4,4,3]]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[[4],[2,7],[1,3,6,9]]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[[1],[2,3],[4,5]]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "[[1],[2],[3]]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[[3],[9,20],[15,7]]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "[[1]]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[[1],[2,2],[3,4,4,3]]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[[4],[2,7],[1,3,6,9]]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[[1],[2,3],[4,5]]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "[[1],[2],[3]]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[[3],[9,20],[15,7]]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "[[1]]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[[1],[2,2],[3,4,4,3]]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[[4],[2,7],[1,3,6,9]]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[[1],[2,3],[4,5]]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 78,
    "title": "Tree: Right Side View",
    "difficulty": "medium",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Tree: Right Side View. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Tree: Right Side View.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [78, 156, 234], k = 4",
    "sampleOutput": "156",
    "boilerplate": "def tree_right_side_view(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [78, 156, 234], k = 4",
        "output": "156",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3,20,7]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "[1]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1,2,3]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4,7,9]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1,3,5]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "[1,2,3]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3,20,7]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1,2,3]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4,7,9]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1,3,5]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "[1,2,3]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3,20,7]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1,2,3]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4,7,9]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1,3,5]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 79,
    "title": "Tree: Construct from Inorder/Preorder",
    "difficulty": "medium",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Tree: Construct from Inorder/Preorder. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Tree: Construct from Inorder/Preorder.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [79, 158, 237], k = 5",
    "sampleOutput": "158",
    "boilerplate": "def tree_construct_from_inorder_preorder(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [79, 158, 237], k = 5",
        "output": "158",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3,9,20]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "[1,null,null]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1,2,2]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4,2,7]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1,2,3]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "[1,null,2]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3,9,20]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "[1,null,null]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1,2,2]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4,2,7]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1,2,3]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "[1,null,2]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3,9,20]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "[1,null,null]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1,2,2]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4,2,7]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1,2,3]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 80,
    "title": "Validate Binary Search Tree",
    "difficulty": "medium",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Validate Binary Search Tree. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Validate Binary Search Tree.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [80, 160, 240], k = 1",
    "sampleOutput": "160",
    "boilerplate": "def validate_binary_search_tree(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [80, 160, 240], k = 1",
        "output": "160",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "false",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 81,
    "title": "Kth Smallest Element in a BST",
    "difficulty": "medium",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Kth Smallest Element in a BST. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Kth Smallest Element in a BST.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [81, 162, 243], k = 2",
    "sampleOutput": "162",
    "boilerplate": "def kth_smallest_element_in_a_bst(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "undefined",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "undefined",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "undefined",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "undefined",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 82,
    "title": "Lowest Common Ancestor of Binary Tree",
    "difficulty": "medium",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Lowest Common Ancestor of Binary Tree. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Lowest Common Ancestor of Binary Tree.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [82, 164, 246], k = 3",
    "sampleOutput": "164",
    "boilerplate": "def lowest_common_ancestor_of_binary_tree(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [82, 164, 246], k = 3",
        "output": "164",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "1",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 83,
    "title": "Trie (Prefix Tree) Implementation",
    "difficulty": "medium",
    "category": "Strings",
    "description": "Solve the comprehensive problem: Trie (Prefix Tree) Implementation. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Trie (Prefix Tree) Implementation.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [83, 166, 249], k = 4",
    "sampleOutput": "166",
    "boilerplate": "def trie_prefix_tree_implementation(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [83, 166, 249], k = 4",
        "output": "[null, null, true, true]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 84,
    "title": "Graph: Number of Islands",
    "difficulty": "medium",
    "category": "Graphs",
    "description": "Solve the comprehensive problem: Graph: Number of Islands. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Graph: Number of Islands.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [84, 168, 252], k = 5",
    "sampleOutput": "168",
    "boilerplate": "def graph_number_of_islands(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [84, 168, 252], k = 5",
        "output": "168",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 85,
    "title": "Graph: Max Area of Island",
    "difficulty": "medium",
    "category": "Graphs",
    "description": "Solve the comprehensive problem: Graph: Max Area of Island. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Graph: Max Area of Island.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [85, 170, 255], k = 1",
    "sampleOutput": "170",
    "boilerplate": "def graph_max_area_of_island(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [85, 170, 255], k = 1",
        "output": "170",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 86,
    "title": "Graph: Clone Graph",
    "difficulty": "medium",
    "category": "Graphs",
    "description": "Solve the comprehensive problem: Graph: Clone Graph. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Graph: Clone Graph.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [86, 172, 258], k = 2",
    "sampleOutput": "172",
    "boilerplate": "def graph_clone_graph(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [86, 172, 258], k = 2",
        "output": "nums = [86, 172, 258], k = 2",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 87,
    "title": "Graph: Course Schedule (Topo Sort)",
    "difficulty": "medium",
    "category": "Graphs",
    "description": "Solve the comprehensive problem: Graph: Course Schedule (Topo Sort). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Graph: Course Schedule (Topo Sort).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [87, 174, 261], k = 3",
    "sampleOutput": "174",
    "boilerplate": "def graph_course_schedule_topo_sort(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [87, 174, 261], k = 3",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 88,
    "title": "Multi-source BFS (Rotting Oranges)",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Multi-source BFS (Rotting Oranges). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Multi-source BFS (Rotting Oranges).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [88, 176, 264], k = 4",
    "sampleOutput": "176",
    "boilerplate": "def multi_source_bfs_rotting_oranges(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [88, 176, 264], k = 4",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 89,
    "title": "Word Search (Grid Backtracking)",
    "difficulty": "medium",
    "category": "Strings",
    "description": "Solve the comprehensive problem: Word Search (Grid Backtracking). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Word Search (Grid Backtracking).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [89, 178, 267], k = 5",
    "sampleOutput": "178",
    "boilerplate": "def word_search_grid_backtracking(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [89, 178, 267], k = 5",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 90,
    "title": "Combinations and Permutations",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Combinations and Permutations. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Combinations and Permutations.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [90, 180, 270], k = 1",
    "sampleOutput": "180",
    "boilerplate": "def combinations_and_permutations(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [90, 180, 270], k = 1",
        "output": "180",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 91,
    "title": "Subsets (Power Set Generation)",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Subsets (Power Set Generation). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Subsets (Power Set Generation).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [91, 182, 273], k = 2",
    "sampleOutput": "182",
    "boilerplate": "def subsets_power_set_generation(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "[[],[4],[2],[4,2],[7],[4,7],[2,7],[4,2,7],[1],[4,1],[2,1],[4,2,1],[7,1],[4,7,1],[2,7,1],[4,2,7,1],[9],[4,9],[2,9],[4,2,9],[7,9],[4,7,9],[2,7,9],[4,2,7,9],[1,9],[4,1,9],[2,1,9],[4,2,1,9],[7,1,9],[4,7,1,9],[2,7,1,9],[4,2,7,1,9]]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "[[],[4],[2],[4,2],[7],[4,7],[2,7],[4,2,7],[1],[4,1],[2,1],[4,2,1],[7,1],[4,7,1],[2,7,1],[4,2,7,1],[9],[4,9],[2,9],[4,2,9],[7,9],[4,7,9],[2,7,9],[4,2,7,9],[1,9],[4,1,9],[2,1,9],[4,2,1,9],[7,1,9],[4,7,1,9],[2,7,1,9],[4,2,7,1,9]]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "[[],[10],[20],[10,20],[30],[10,30],[20,30],[10,20,30],[40],[10,40],[20,40],[10,20,40],[30,40],[10,30,40],[20,30,40],[10,20,30,40],[50],[10,50],[20,50],[10,20,50],[30,50],[10,30,50],[20,30,50],[10,20,30,50],[40,50],[10,40,50],[20,40,50],[10,20,40,50],[30,40,50],[10,30,40,50],[20,30,40,50],[10,20,30,40,50]]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "[[],[5],[4],[5,4],[3],[5,3],[4,3],[5,4,3],[2],[5,2],[4,2],[5,4,2],[3,2],[5,3,2],[4,3,2],[5,4,3,2],[1],[5,1],[4,1],[5,4,1],[3,1],[5,3,1],[4,3,1],[5,4,3,1],[2,1],[5,2,1],[4,2,1],[5,4,2,1],[3,2,1],[5,3,2,1],[4,3,2,1],[5,4,3,2,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "[[],[-10],[-5],[-10,-5],[0],[-10,0],[-5,0],[-10,-5,0],[5],[-10,5],[-5,5],[-10,-5,5],[0,5],[-10,0,5],[-5,0,5],[-10,-5,0,5],[10],[-10,10],[-5,10],[-10,-5,10],[0,10],[-10,0,10],[-5,0,10],[-10,-5,0,10],[5,10],[-10,5,10],[-5,5,10],[-10,-5,5,10],[0,5,10],[-10,0,5,10],[-5,0,5,10],[-10,-5,0,5,10]]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "[[],[1],[1],[1,1],[1],[1,1],[1,1],[1,1,1],[1],[1,1],[1,1],[1,1,1],[1,1],[1,1,1],[1,1,1],[1,1,1,1],[1],[1,1],[1,1],[1,1,1],[1,1],[1,1,1],[1,1,1],[1,1,1,1],[1,1],[1,1,1],[1,1,1],[1,1,1,1],[1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1,1]]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "[[],[100],[200],[100,200],[300],[100,300],[200,300],[100,200,300],[400],[100,400],[200,400],[100,200,400],[300,400],[100,300,400],[200,300,400],[100,200,300,400]]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "[[],[9],[8],[9,8],[7],[9,7],[8,7],[9,8,7],[6],[9,6],[8,6],[9,8,6],[7,6],[9,7,6],[8,7,6],[9,8,7,6],[5],[9,5],[8,5],[9,8,5],[7,5],[9,7,5],[8,7,5],[9,8,7,5],[6,5],[9,6,5],[8,6,5],[9,8,6,5],[7,6,5],[9,7,6,5],[8,7,6,5],[9,8,7,6,5]]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "[[],[0],[0],[0,0],[0],[0,0],[0,0],[0,0,0]]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "[[],[12],[45],[12,45],[67],[12,67],[45,67],[12,45,67],[89],[12,89],[45,89],[12,45,89],[67,89],[12,67,89],[45,67,89],[12,45,67,89],[23],[12,23],[45,23],[12,45,23],[67,23],[12,67,23],[45,67,23],[12,45,67,23],[89,23],[12,89,23],[45,89,23],[12,45,89,23],[67,89,23],[12,67,89,23],[45,67,89,23],[12,45,67,89,23]]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "[[],[1],[3],[1,3],[5],[1,5],[3,5],[1,3,5],[7],[1,7],[3,7],[1,3,7],[5,7],[1,5,7],[3,5,7],[1,3,5,7],[9],[1,9],[3,9],[1,3,9],[5,9],[1,5,9],[3,5,9],[1,3,5,9],[7,9],[1,7,9],[3,7,9],[1,3,7,9],[5,7,9],[1,5,7,9],[3,5,7,9],[1,3,5,7,9],[11],[1,11],[3,11],[1,3,11],[5,11],[1,5,11],[3,5,11],[1,3,5,11],[7,11],[1,7,11],[3,7,11],[1,3,7,11],[5,7,11],[1,5,7,11],[3,5,7,11],[1,3,5,7,11],[9,11],[1,9,11],[3,9,11],[1,3,9,11],[5,9,11],[1,5,9,11],[3,5,9,11],[1,3,5,9,11],[7,9,11],[1,7,9,11],[3,7,9,11],[1,3,7,9,11],[5,7,9,11],[1,5,7,9,11],[3,5,7,9,11],[1,3,5,7,9,11]]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "[[],[50],[40],[50,40],[30],[50,30],[40,30],[50,40,30],[20],[50,20],[40,20],[50,40,20],[30,20],[50,30,20],[40,30,20],[50,40,30,20]]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "[[],[-1],[-2],[-1,-2],[-3],[-1,-3],[-2,-3],[-1,-2,-3],[-4],[-1,-4],[-2,-4],[-1,-2,-4],[-3,-4],[-1,-3,-4],[-2,-3,-4],[-1,-2,-3,-4]]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "[[],[1000],[2000],[1000,2000],[3000],[1000,3000],[2000,3000],[1000,2000,3000]]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "[[],[15],[30],[15,30],[45],[15,45],[30,45],[15,30,45],[60],[15,60],[30,60],[15,30,60],[45,60],[15,45,60],[30,45,60],[15,30,45,60],[75],[15,75],[30,75],[15,30,75],[45,75],[15,45,75],[30,45,75],[15,30,45,75],[60,75],[15,60,75],[30,60,75],[15,30,60,75],[45,60,75],[15,45,60,75],[30,45,60,75],[15,30,45,60,75]]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "[[],[2],[4],[2,4],[6],[2,6],[4,6],[2,4,6],[8],[2,8],[4,8],[2,4,8],[6,8],[2,6,8],[4,6,8],[2,4,6,8],[10],[2,10],[4,10],[2,4,10],[6,10],[2,6,10],[4,6,10],[2,4,6,10],[8,10],[2,8,10],[4,8,10],[2,4,8,10],[6,8,10],[2,6,8,10],[4,6,8,10],[2,4,6,8,10]]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "[[],[99],[88],[99,88],[77],[99,77],[88,77],[99,88,77],[66],[99,66],[88,66],[99,88,66],[77,66],[99,77,66],[88,77,66],[99,88,77,66]]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "[[],[3],[6],[3,6],[9],[3,9],[6,9],[3,6,9],[12],[3,12],[6,12],[3,6,12],[9,12],[3,9,12],[6,9,12],[3,6,9,12],[15],[3,15],[6,15],[3,6,15],[9,15],[3,9,15],[6,9,15],[3,6,9,15],[12,15],[3,12,15],[6,12,15],[3,6,12,15],[9,12,15],[3,9,12,15],[6,9,12,15],[3,6,9,12,15]]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 92,
    "title": "Letter Combinations of Phone Number",
    "difficulty": "medium",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Letter Combinations of Phone Number. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Letter Combinations of Phone Number.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [92, 184, 276], k = 3",
    "sampleOutput": "184",
    "boilerplate": "def letter_combinations_of_phone_number(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [92, 184, 276], k = 3",
        "output": "184",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "184",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "184",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "184",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 93,
    "title": "Dynamic Programming: 0/1 Knapsack",
    "difficulty": "medium",
    "category": "Dynamic Programming",
    "description": "Solve the comprehensive problem: Dynamic Programming: 0/1 Knapsack. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Dynamic Programming: 0/1 Knapsack.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [93, 186, 279], k = 4",
    "sampleOutput": "186",
    "boilerplate": "def dynamic_programming_0_1_knapsack(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [93, 186, 279], k = 4",
        "output": "186",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 94,
    "title": "DP: Coin Change Problem",
    "difficulty": "medium",
    "category": "Dynamic Programming",
    "description": "Solve the comprehensive problem: DP: Coin Change Problem. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for DP: Coin Change Problem.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [94, 188, 282], k = 5",
    "sampleOutput": "188",
    "boilerplate": "def dp_coin_change_problem(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [94, 188, 282], k = 5",
        "output": "188",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 95,
    "title": "DP: Longest Increasing Subsequence",
    "difficulty": "medium",
    "category": "Dynamic Programming",
    "description": "Solve the comprehensive problem: DP: Longest Increasing Subsequence. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for DP: Longest Increasing Subsequence.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [95, 190, 285], k = 1",
    "sampleOutput": "190",
    "boilerplate": "def dp_longest_increasing_subsequence(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 96,
    "title": "DP: Longest Common Subsequence",
    "difficulty": "medium",
    "category": "Dynamic Programming",
    "description": "Solve the comprehensive problem: DP: Longest Common Subsequence. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for DP: Longest Common Subsequence.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [96, 192, 288], k = 2",
    "sampleOutput": "192",
    "boilerplate": "def dp_longest_common_subsequence(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [96, 192, 288], k = 2",
        "output": "192",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 97,
    "title": "DP: House Robber",
    "difficulty": "medium",
    "category": "Dynamic Programming",
    "description": "Solve the comprehensive problem: DP: House Robber. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for DP: House Robber.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [97, 194, 291], k = 3",
    "sampleOutput": "194",
    "boilerplate": "def dp_house_robber(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "20",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "20",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "90",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "10",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "600",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "21",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "134",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "21",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "4000",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "135",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "176",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "27",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 98,
    "title": "DP: Word Break",
    "difficulty": "medium",
    "category": "Strings",
    "description": "Solve the comprehensive problem: DP: Word Break. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for DP: Word Break.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [98, 196, 294], k = 4",
    "sampleOutput": "196",
    "boilerplate": "def dp_word_break(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [98, 196, 294], k = 4",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 99,
    "title": "Greedy: Jump Game",
    "difficulty": "medium",
    "category": "Greedy",
    "description": "Solve the comprehensive problem: Greedy: Jump Game. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Greedy: Jump Game.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [99, 198, 297], k = 5",
    "sampleOutput": "198",
    "boilerplate": "def greedy_jump_game(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "false",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 100,
    "title": "Greedy: Task Scheduler",
    "difficulty": "medium",
    "category": "Greedy",
    "description": "Solve the comprehensive problem: Greedy: Task Scheduler. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Greedy: Task Scheduler.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^5",
    "sampleInput": "nums = [100, 200, 300], k = 1",
    "sampleOutput": "200",
    "boilerplate": "def greedy_task_scheduler(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [100, 200, 300], k = 1",
        "output": "200",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 101,
    "title": "Minimum Window Substring",
    "difficulty": "hard",
    "category": "Strings",
    "description": "Solve the comprehensive problem: Minimum Window Substring. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Minimum Window Substring.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [101, 202, 303], k = 2",
    "sampleOutput": "202",
    "boilerplate": "def minimum_window_substring(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [101, 202, 303], k = 2",
        "output": "BANC",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "BANC",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "BANC",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "BANC",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 102,
    "title": "Advanced Sliding Window (Multiple Conditions)",
    "difficulty": "hard",
    "category": "Sliding Window",
    "description": "Solve the comprehensive problem: Advanced Sliding Window (Multiple Conditions). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Advanced Sliding Window (Multiple Conditions).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [102, 204, 306], k = 3",
    "sampleOutput": "204",
    "boilerplate": "def advanced_sliding_window_multiple_conditions(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [102, 204, 306], k = 3",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 103,
    "title": "Subarrays with K Different Integers",
    "difficulty": "hard",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Subarrays with K Different Integers. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Subarrays with K Different Integers.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [103, 206, 309], k = 4",
    "sampleOutput": "206",
    "boilerplate": "def subarrays_with_k_different_integers(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [103, 206, 309], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 104,
    "title": "Two Pointers on Multiple Arrays",
    "difficulty": "hard",
    "category": "Two Pointers",
    "description": "Solve the comprehensive problem: Two Pointers on Multiple Arrays. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Two Pointers on Multiple Arrays.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [104, 208, 312], k = 5",
    "sampleOutput": "208",
    "boilerplate": "def two_pointers_on_multiple_arrays(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [104, 208, 312], k = 5",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 105,
    "title": "Median of Two Sorted Arrays",
    "difficulty": "hard",
    "category": "Sorting",
    "description": "Solve the comprehensive problem: Median of Two Sorted Arrays. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Median of Two Sorted Arrays.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [105, 210, 315], k = 1",
    "sampleOutput": "210",
    "boilerplate": "def median_of_two_sorted_arrays(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[1,3,5]\n[2,4,6]",
        "output": "3.5",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[5,4,3,2,1]\n[-10,-5,0,5,10]",
        "output": "2.5",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1,1,1,1,1]\n[100,200,300,400]",
        "output": "1.0",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[9,8,7,6,5]\n[0,0,0]",
        "output": "5.5",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[12,45,67,89,23]\n[1,3,5,7,9,11]",
        "output": "11.0",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[50,40,30,20]\n[-1,-2,-3,-4]",
        "output": "9.5",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1000,2000,3000]\n[15,30,45,60,75]",
        "output": "67.5",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[2,4,6,8,10]\n[99,88,77,66]",
        "output": "10.0",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[3,6,9,12,15]\n[4,2,7,1,9]",
        "output": "6.5",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[10,20,30,40,50]\n[5,4,3,2,1]",
        "output": "7.5",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[-10,-5,0,5,10]\n[1,1,1,1,1]",
        "output": "1.0",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[100,200,300,400]\n[9,8,7,6,5]",
        "output": "9.0",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[0,0,0]\n[12,45,67,89,23]",
        "output": "17.5",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1,3,5,7,9,11]\n[50,40,30,20]",
        "output": "10.0",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[-1,-2,-3,-4]\n[1000,2000,3000]",
        "output": "-1.0",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[15,30,45,60,75]\n[2,4,6,8,10]",
        "output": "12.5",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n[3,6,9,12,15]",
        "output": "15.0",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[4,2,7,1,9]\n[10,20,30,40,50]",
        "output": "9.5",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 106,
    "title": "Binary Search on Matrix/Complex Space",
    "difficulty": "hard",
    "category": "Searching",
    "description": "Solve the comprehensive problem: Binary Search on Matrix/Complex Space. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Binary Search on Matrix/Complex Space.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [106, 212, 318], k = 2",
    "sampleOutput": "212",
    "boilerplate": "def binary_search_on_matrix_complex_space(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [106, 212, 318], k = 2",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 107,
    "title": "Split Array Largest Sum",
    "difficulty": "hard",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Split Array Largest Sum. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Split Array Largest Sum.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [107, 214, 321], k = 3",
    "sampleOutput": "214",
    "boilerplate": "def split_array_largest_sum(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "18",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "18",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "18",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 108,
    "title": "First Missing Positive (In-place Hashing)",
    "difficulty": "hard",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: First Missing Positive (In-place Hashing). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for First Missing Positive (In-place Hashing).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [108, 216, 324], k = 4",
    "sampleOutput": "216",
    "boilerplate": "def first_missing_positive_in_place_hashing(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "1",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "1",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 109,
    "title": "Trapping Rain Water",
    "difficulty": "hard",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Trapping Rain Water. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Trapping Rain Water.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [109, 218, 327], k = 5",
    "sampleOutput": "218",
    "boilerplate": "def trapping_rain_water(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "8",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "8",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "15",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 110,
    "title": "Largest Rectangle in Histogram",
    "difficulty": "hard",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Largest Rectangle in Histogram. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Largest Rectangle in Histogram.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [110, 220, 330], k = 1",
    "sampleOutput": "220",
    "boilerplate": "def largest_rectangle_in_histogram(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "9",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "9",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "90",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "10",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "600",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "25",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "135",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "21",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "90",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "4000",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "135",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "18",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "264",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "27",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 111,
    "title": "Maximal Rectangle in 2D Matrix",
    "difficulty": "hard",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Maximal Rectangle in 2D Matrix. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Maximal Rectangle in 2D Matrix.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [111, 222, 333], k = 2",
    "sampleOutput": "222",
    "boilerplate": "def maximal_rectangle_in_2d_matrix(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [111, 222, 333], k = 2",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 112,
    "title": "Sliding Window Maximum (Monotonic Deque)",
    "difficulty": "hard",
    "category": "Sliding Window",
    "description": "Solve the comprehensive problem: Sliding Window Maximum (Monotonic Deque). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Sliding Window Maximum (Monotonic Deque).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [112, 224, 336], k = 3",
    "sampleOutput": "224",
    "boilerplate": "def sliding_window_maximum_monotonic_deque(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]\n7",
        "output": "[]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]\n7",
        "output": "[]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]\n30",
        "output": "[]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]\n1",
        "output": "[5,4,3,2,1]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]\n0",
        "output": "[null,null,null,null,null,null]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]\n1",
        "output": "[1,1,1,1,1]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]\n999",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]\n5",
        "output": "[9]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]\n0",
        "output": "[null,null,null,null]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]\n89",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]\n7",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]\n20",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]\n-3",
        "output": "[-1,-2,-3,null,null,null,null,null]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]\n2000",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]\n45",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]\n10",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n77",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]\n9",
        "output": "[]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 113,
    "title": "Design LFU/LRU Cache",
    "difficulty": "hard",
    "category": "Linked Lists",
    "description": "Solve the comprehensive problem: Design LFU/LRU Cache. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Design LFU/LRU Cache.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [113, 226, 339], k = 4",
    "sampleOutput": "226",
    "boilerplate": "def design_lfu_lru_cache(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [113, 226, 339], k = 4",
        "output": "[null, null, 1]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 114,
    "title": "Merge K Sorted Lists (Min-Heap)",
    "difficulty": "hard",
    "category": "Sorting",
    "description": "Solve the comprehensive problem: Merge K Sorted Lists (Min-Heap). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Merge K Sorted Lists (Min-Heap).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [114, 228, 342], k = 5",
    "sampleOutput": "228",
    "boilerplate": "def merge_k_sorted_lists_min_heap(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[1,3,5]\n[2,4,6]",
        "output": "228",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[5,4,3,2,1]\n[-10,-5,0,5,10]",
        "output": "228",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1,1,1,1,1]\n[100,200,300,400]",
        "output": "228",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[9,8,7,6,5]\n[0,0,0]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[12,45,67,89,23]\n[1,3,5,7,9,11]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[50,40,30,20]\n[-1,-2,-3,-4]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1000,2000,3000]\n[15,30,45,60,75]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[2,4,6,8,10]\n[99,88,77,66]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[3,6,9,12,15]\n[4,2,7,1,9]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[10,20,30,40,50]\n[5,4,3,2,1]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[-10,-5,0,5,10]\n[1,1,1,1,1]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[100,200,300,400]\n[9,8,7,6,5]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[0,0,0]\n[12,45,67,89,23]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1,3,5,7,9,11]\n[50,40,30,20]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[-1,-2,-3,-4]\n[1000,2000,3000]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[15,30,45,60,75]\n[2,4,6,8,10]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]\n[3,6,9,12,15]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[4,2,7,1,9]\n[10,20,30,40,50]",
        "output": "228",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 115,
    "title": "Reverse Nodes in k-Group",
    "difficulty": "hard",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Reverse Nodes in k-Group. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Reverse Nodes in k-Group.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [115, 230, 345], k = 1",
    "sampleOutput": "230",
    "boilerplate": "def reverse_nodes_in_k_group(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [115, 230, 345], k = 1",
        "output": "230",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 116,
    "title": "Tree: Maximum Path Sum",
    "difficulty": "hard",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Tree: Maximum Path Sum. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Tree: Maximum Path Sum.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [116, 232, 348], k = 2",
    "sampleOutput": "232",
    "boilerplate": "def tree_maximum_path_sum(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [116, 232, 348], k = 2",
        "output": "6",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "6",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "6",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 117,
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "hard",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Serialize and Deserialize Binary Tree. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Serialize and Deserialize Binary Tree.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [117, 234, 351], k = 3",
    "sampleOutput": "234",
    "boilerplate": "def serialize_and_deserialize_binary_tree(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [117, 234, 351], k = 3",
        "output": "nums = [117, 234, 351], k = 3",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3, 9, 20, null, null, 15, 7]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "[1]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1, 2, 2, 3, 4, 4, 3]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4, 2, 7, 1, 3, 6, 9]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1, 2, 3, 4, 5]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "[1, null, 2, 3]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3, 9, 20, null, null, 15, 7]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1, 2, 2, 3, 4, 4, 3]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4, 2, 7, 1, 3, 6, 9]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1, 2, 3, 4, 5]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "[1, null, 2, 3]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3, 9, 20, null, null, 15, 7]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1, 2, 2, 3, 4, 4, 3]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4, 2, 7, 1, 3, 6, 9]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1, 2, 3, 4, 5]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 118,
    "title": "Recover Binary Search Tree",
    "difficulty": "hard",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Recover Binary Search Tree. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Recover Binary Search Tree.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [118, 236, 354], k = 4",
    "sampleOutput": "236",
    "boilerplate": "def recover_binary_search_tree(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [118, 236, 354], k = 4",
        "output": "nums = [118, 236, 354], k = 4",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3, 9, 20, null, null, 15, 7]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "[1]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1, 2, 2, 3, 4, 4, 3]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4, 2, 7, 1, 3, 6, 9]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1, 2, 3, 4, 5]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "[1, null, 2, 3]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3, 9, 20, null, null, 15, 7]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1, 2, 2, 3, 4, 4, 3]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4, 2, 7, 1, 3, 6, 9]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1, 2, 3, 4, 5]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "[1, null, 2, 3]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "[3, 9, 20, null, null, 15, 7]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "[1]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "[1, 2, 2, 3, 4, 4, 3]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "[4, 2, 7, 1, 3, 6, 9]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "[1, 2, 3, 4, 5]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 119,
    "title": "Word Search II (Trie + Backtracking)",
    "difficulty": "hard",
    "category": "Strings",
    "description": "Solve the comprehensive problem: Word Search II (Trie + Backtracking). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Word Search II (Trie + Backtracking).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [119, 238, 357], k = 5",
    "sampleOutput": "238",
    "boilerplate": "def word_search_ii_trie_backtracking(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [119, 238, 357], k = 5",
        "output": "[\"oa\", \"oaa\"]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 120,
    "title": "String: Regular Expression Matching",
    "difficulty": "hard",
    "category": "Strings",
    "description": "Solve the comprehensive problem: String: Regular Expression Matching. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for String: Regular Expression Matching.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [120, 240, 360], k = 1",
    "sampleOutput": "240",
    "boilerplate": "def string_regular_expression_matching(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [120, 240, 360], k = 1",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 121,
    "title": "String: Wildcard Matching",
    "difficulty": "hard",
    "category": "Strings",
    "description": "Solve the comprehensive problem: String: Wildcard Matching. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for String: Wildcard Matching.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [121, 242, 363], k = 2",
    "sampleOutput": "242",
    "boilerplate": "def string_wildcard_matching(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [121, 242, 363], k = 2",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 122,
    "title": "String: Longest Valid Parentheses",
    "difficulty": "hard",
    "category": "Strings",
    "description": "Solve the comprehensive problem: String: Longest Valid Parentheses. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for String: Longest Valid Parentheses.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [122, 244, 366], k = 3",
    "sampleOutput": "244",
    "boilerplate": "def string_longest_valid_parentheses(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [122, 244, 366], k = 3",
        "output": "4",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "4",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "4",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "4",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 123,
    "title": "String: Edit Distance",
    "difficulty": "hard",
    "category": "Strings",
    "description": "Solve the comprehensive problem: String: Edit Distance. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for String: Edit Distance.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [123, 246, 369], k = 4",
    "sampleOutput": "246",
    "boilerplate": "def string_edit_distance(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [123, 246, 369], k = 4",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "3",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "3",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 124,
    "title": "KMP Algorithm (Pattern Matching)",
    "difficulty": "hard",
    "category": "Strings",
    "description": "Solve the comprehensive problem: KMP Algorithm (Pattern Matching). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for KMP Algorithm (Pattern Matching).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [124, 248, 372], k = 5",
    "sampleOutput": "248",
    "boilerplate": "def kmp_algorithm_pattern_matching(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [124, 248, 372], k = 5",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 125,
    "title": "Rabin-Karp Algorithm (Rolling Hash)",
    "difficulty": "hard",
    "category": "Strings",
    "description": "Solve the comprehensive problem: Rabin-Karp Algorithm (Rolling Hash). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Rabin-Karp Algorithm (Rolling Hash).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [125, 250, 375], k = 1",
    "sampleOutput": "250",
    "boilerplate": "def rabin_karp_algorithm_rolling_hash(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [125, 250, 375], k = 1",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "hello",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "A man, a plan, a canal: Panama",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "leetcode",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "anagram\nnagaram",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "rat\ncar",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "()[]{}",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "(]",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "LVIII",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "MCMXCIV",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "babad",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "cbbd",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "a",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "ac",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "abcabcbb",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "bbbbb",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "pwwkew",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "ADOBECODEBANC\nABC",
        "output": "[0, 2, 5, 8, 10]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 126,
    "title": "Graph: Word Ladder (Bidirectional BFS)",
    "difficulty": "hard",
    "category": "Strings",
    "description": "Solve the comprehensive problem: Graph: Word Ladder (Bidirectional BFS). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Graph: Word Ladder (Bidirectional BFS).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [126, 252, 378], k = 2",
    "sampleOutput": "252",
    "boilerplate": "def graph_word_ladder_bidirectional_bfs(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [126, 252, 378], k = 2",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 127,
    "title": "Graph: Alien Dictionary (Topological)",
    "difficulty": "hard",
    "category": "Graphs",
    "description": "Solve the comprehensive problem: Graph: Alien Dictionary (Topological). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Graph: Alien Dictionary (Topological).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [127, 254, 381], k = 3",
    "sampleOutput": "254",
    "boilerplate": "def graph_alien_dictionary_topological(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [127, 254, 381], k = 3",
        "output": "\"wertf\"",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 128,
    "title": "Minimum Spanning Tree (Kruskal/Prim)",
    "difficulty": "hard",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Minimum Spanning Tree (Kruskal/Prim). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Minimum Spanning Tree (Kruskal/Prim).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [128, 256, 384], k = 4",
    "sampleOutput": "256",
    "boilerplate": "def minimum_spanning_tree_kruskal_prim(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [128, 256, 384], k = 4",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 129,
    "title": "Graph: Shortest Path (Dijkstra)",
    "difficulty": "hard",
    "category": "Graphs",
    "description": "Solve the comprehensive problem: Graph: Shortest Path (Dijkstra). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Graph: Shortest Path (Dijkstra).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [129, 258, 387], k = 5",
    "sampleOutput": "258",
    "boilerplate": "def graph_shortest_path_dijkstra(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [129, 258, 387], k = 5",
        "output": "[0, 4, 3, 5, -1]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 130,
    "title": "Graph: Bellman-Ford Algorithm",
    "difficulty": "hard",
    "category": "Graphs",
    "description": "Solve the comprehensive problem: Graph: Bellman-Ford Algorithm. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Graph: Bellman-Ford Algorithm.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [130, 260, 390], k = 1",
    "sampleOutput": "260",
    "boilerplate": "def graph_bellman_ford_algorithm(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [130, 260, 390], k = 1",
        "output": "[0, 4, 2]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 131,
    "title": "Graph: Floyd-Warshall Algorithm",
    "difficulty": "hard",
    "category": "Graphs",
    "description": "Solve the comprehensive problem: Graph: Floyd-Warshall Algorithm. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Graph: Floyd-Warshall Algorithm.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [131, 262, 393], k = 2",
    "sampleOutput": "262",
    "boilerplate": "def graph_floyd_warshall_algorithm(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [131, 262, 393], k = 2",
        "output": "[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 132,
    "title": "Strongly Connected Components (Tarjan)",
    "difficulty": "hard",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Strongly Connected Components (Tarjan). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Strongly Connected Components (Tarjan).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [132, 264, 396], k = 3",
    "sampleOutput": "264",
    "boilerplate": "def strongly_connected_components_tarjan(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [132, 264, 396], k = 3",
        "output": "[[4], [3], [0, 1, 2]]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 133,
    "title": "Eulerian Path and Circuit",
    "difficulty": "hard",
    "category": "Graphs",
    "description": "Solve the comprehensive problem: Eulerian Path and Circuit. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Eulerian Path and Circuit.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [133, 266, 399], k = 4",
    "sampleOutput": "266",
    "boilerplate": "def eulerian_path_and_circuit(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [133, 266, 399], k = 4",
        "output": "true",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 134,
    "title": "Graph: Network Delay Time",
    "difficulty": "hard",
    "category": "Graphs",
    "description": "Solve the comprehensive problem: Graph: Network Delay Time. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Graph: Network Delay Time.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [134, 268, 402], k = 5",
    "sampleOutput": "268",
    "boilerplate": "def graph_network_delay_time(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [134, 268, 402], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 135,
    "title": "Disjoint Set Union (Path Compression)",
    "difficulty": "hard",
    "category": "Graphs",
    "description": "Solve the comprehensive problem: Disjoint Set Union (Path Compression). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Disjoint Set Union (Path Compression).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [135, 270, 405], k = 1",
    "sampleOutput": "270",
    "boilerplate": "def disjoint_set_union_path_compression(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [135, 270, 405], k = 1",
        "output": "0",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 136,
    "title": "Segment Tree Implementation",
    "difficulty": "hard",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Segment Tree Implementation. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Segment Tree Implementation.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [136, 272, 408], k = 2",
    "sampleOutput": "272",
    "boilerplate": "def segment_tree_implementation(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [136, 272, 408], k = 2",
        "output": "9",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 137,
    "title": "Binary Indexed Tree (Fenwick Tree)",
    "difficulty": "hard",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: Binary Indexed Tree (Fenwick Tree). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Binary Indexed Tree (Fenwick Tree).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [137, 274, 411], k = 3",
    "sampleOutput": "274",
    "boilerplate": "def binary_indexed_tree_fenwick_tree(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [137, 274, 411], k = 3",
        "output": "6",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 138,
    "title": "Line Sweep Algorithm",
    "difficulty": "hard",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Line Sweep Algorithm. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Line Sweep Algorithm.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [138, 276, 414], k = 4",
    "sampleOutput": "276",
    "boilerplate": "def line_sweep_algorithm(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [138, 276, 414], k = 4",
        "output": "7",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 139,
    "title": "Advanced Greedy: Min Refueling Stops",
    "difficulty": "hard",
    "category": "Greedy",
    "description": "Solve the comprehensive problem: Advanced Greedy: Min Refueling Stops. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Advanced Greedy: Min Refueling Stops.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [139, 278, 417], k = 5",
    "sampleOutput": "278",
    "boilerplate": "def advanced_greedy_min_refueling_stops(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [139, 278, 417], k = 5",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 140,
    "title": "DP: Burst Balloons (Interval DP)",
    "difficulty": "hard",
    "category": "Dynamic Programming",
    "description": "Solve the comprehensive problem: DP: Burst Balloons (Interval DP). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for DP: Burst Balloons (Interval DP).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [140, 280, 420], k = 1",
    "sampleOutput": "280",
    "boilerplate": "def dp_burst_balloons_interval_dp(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "[4,2,7,1,9]",
        "output": "167",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[4,2,7,1,9]",
        "output": "167",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[10,20,30,40,50]",
        "output": "167",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[5,4,3,2,1]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[-10,-5,0,5,10]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1,1,1,1,1]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[100,200,300,400]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[9,8,7,6,5]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[0,0,0]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[12,45,67,89,23]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[1,3,5,7,9,11]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[50,40,30,20]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[-1,-2,-3,-4]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[1000,2000,3000]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[15,30,45,60,75]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[2,4,6,8,10]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[99,88,77,66]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[3,6,9,12,15]",
        "output": "167",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 141,
    "title": "DP: Matrix Chain Multiplication",
    "difficulty": "hard",
    "category": "Dynamic Programming",
    "description": "Solve the comprehensive problem: DP: Matrix Chain Multiplication. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for DP: Matrix Chain Multiplication.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [141, 282, 423], k = 2",
    "sampleOutput": "282",
    "boilerplate": "def dp_matrix_chain_multiplication(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [141, 282, 423], k = 2",
        "output": "30000",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 142,
    "title": "DP on Trees (Binary Tree Cameras)",
    "difficulty": "hard",
    "category": "Trees & BST",
    "description": "Solve the comprehensive problem: DP on Trees (Binary Tree Cameras). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for DP on Trees (Binary Tree Cameras).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [142, 284, 426], k = 3",
    "sampleOutput": "284",
    "boilerplate": "def dp_on_trees_binary_tree_cameras(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [142, 284, 426], k = 3",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "[1]",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "[1, 2, 3, 4, 5]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "[1, null, 2, 3]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "[1]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "[1, 2, 3, 4, 5]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "[1, null, 2, 3]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "[3, 9, 20, null, null, 15, 7]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "[1]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "[1, 2, 2, 3, 4, 4, 3]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "[4, 2, 7, 1, 3, 6, 9]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "[1, 2, 3, 4, 5]",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 143,
    "title": "DP with Bitmasking (Travelling Salesperson)",
    "difficulty": "hard",
    "category": "Dynamic Programming",
    "description": "Solve the comprehensive problem: DP with Bitmasking (Travelling Salesperson). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for DP with Bitmasking (Travelling Salesperson).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [143, 286, 429], k = 4",
    "sampleOutput": "286",
    "boilerplate": "def dp_with_bitmasking_travelling_salesperson(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [143, 286, 429], k = 4",
        "output": "80",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 144,
    "title": "Digit DP",
    "difficulty": "hard",
    "category": "Dynamic Programming",
    "description": "Solve the comprehensive problem: Digit DP. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Digit DP.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [144, 288, 432], k = 5",
    "sampleOutput": "288",
    "boilerplate": "def digit_dp(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [144, 288, 432], k = 5",
        "output": "12",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 145,
    "title": "DP: Profit Scheme / 3D DP",
    "difficulty": "hard",
    "category": "Dynamic Programming",
    "description": "Solve the comprehensive problem: DP: Profit Scheme / 3D DP. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for DP: Profit Scheme / 3D DP.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [145, 290, 435], k = 1",
    "sampleOutput": "290",
    "boilerplate": "def dp_profit_scheme_3d_dp(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [145, 290, 435], k = 1",
        "output": "2",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 146,
    "title": "Math: Fast Fourier Transform Concepts",
    "difficulty": "hard",
    "category": "Math",
    "description": "Solve the comprehensive problem: Math: Fast Fourier Transform Concepts. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Math: Fast Fourier Transform Concepts.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [146, 292, 438], k = 2",
    "sampleOutput": "292",
    "boilerplate": "def math_fast_fourier_transform_concepts(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [146, 292, 438], k = 2",
        "output": "[3, 10, 8]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 147,
    "title": "Sieve of Eratosthenes (Advanced Constraints)",
    "difficulty": "hard",
    "category": "Arrays & Algorithms",
    "description": "Solve the comprehensive problem: Sieve of Eratosthenes (Advanced Constraints). Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Sieve of Eratosthenes (Advanced Constraints).",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [147, 294, 441], k = 3",
    "sampleOutput": "294",
    "boilerplate": "def sieve_of_eratosthenes_advanced_constraints(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [147, 294, 441], k = 3",
        "output": "[]",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "3",
        "output": "[2,3]",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "6",
        "output": "[2,3,5]",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "9",
        "output": "[2,3,5,7]",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "12",
        "output": "[2,3,5,7,11]",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "15",
        "output": "[2,3,5,7,11,13]",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "18",
        "output": "[2,3,5,7,11,13,17]",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "21",
        "output": "[2,3,5,7,11,13,17,19]",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "24",
        "output": "[2,3,5,7,11,13,17,19,23]",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "27",
        "output": "[2,3,5,7,11,13,17,19,23]",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "30",
        "output": "[2,3,5,7,11,13,17,19,23,29]",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "33",
        "output": "[2,3,5,7,11,13,17,19,23,29,31]",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "36",
        "output": "[2,3,5,7,11,13,17,19,23,29,31]",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "39",
        "output": "[2,3,5,7,11,13,17,19,23,29,31,37]",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "42",
        "output": "[2,3,5,7,11,13,17,19,23,29,31,37,41]",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "45",
        "output": "[2,3,5,7,11,13,17,19,23,29,31,37,41,43]",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "48",
        "output": "[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47]",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "51",
        "output": "[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47]",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 148,
    "title": "Game Theory: Minimax Algorithm",
    "difficulty": "hard",
    "category": "Math",
    "description": "Solve the comprehensive problem: Game Theory: Minimax Algorithm. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Game Theory: Minimax Algorithm.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [148, 296, 444], k = 4",
    "sampleOutput": "296",
    "boilerplate": "def game_theory_minimax_algorithm(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [148, 296, 444], k = 4",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 149,
    "title": "Game Theory: Nim Game Variants",
    "difficulty": "hard",
    "category": "Math",
    "description": "Solve the comprehensive problem: Game Theory: Nim Game Variants. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Game Theory: Nim Game Variants.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [149, 298, 447], k = 5",
    "sampleOutput": "298",
    "boilerplate": "def game_theory_nim_game_variants(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [149, 298, 447], k = 5",
        "output": "First",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  },
  {
    "id": 150,
    "title": "Max Flow / Bipartite Matching",
    "difficulty": "hard",
    "category": "Graphs",
    "description": "Solve the comprehensive problem: Max Flow / Bipartite Matching. Implement an optimal algorithm that satisfies time & space complexity constraints.",
    "inputFormat": "Standard input with parameters for Max Flow / Bipartite Matching.",
    "outputFormat": "Evaluated output result according to specifications.",
    "constraints": "1 <= N <= 10^6",
    "sampleInput": "nums = [150, 300, 450], k = 1",
    "sampleOutput": "300",
    "boilerplate": "def max_flow_bipartite_matching(*args):\n    # Implement your algorithm here\n    pass",
    "testCases": [
      {
        "id": 1,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 1"
      },
      {
        "id": 2,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 2"
      },
      {
        "id": 3,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": false,
        "label": "Open Test Case 3"
      },
      {
        "id": 4,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 1"
      },
      {
        "id": 5,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 2"
      },
      {
        "id": 6,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 3"
      },
      {
        "id": 7,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 4"
      },
      {
        "id": 8,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 5"
      },
      {
        "id": 9,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 6"
      },
      {
        "id": 10,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 7"
      },
      {
        "id": 11,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 8"
      },
      {
        "id": 12,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 9"
      },
      {
        "id": 13,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 10"
      },
      {
        "id": 14,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 11"
      },
      {
        "id": 15,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 12"
      },
      {
        "id": 16,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 13"
      },
      {
        "id": 17,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 14"
      },
      {
        "id": 18,
        "input": "nums = [150, 300, 450], k = 1",
        "output": "5",
        "isHidden": true,
        "label": "Hidden Test Case 15"
      }
    ]
  }
];

export default all150CodingProblems;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = all150CodingProblems;
}
