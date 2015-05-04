Feature: Decimals Work
  
  As a user
  I want to be able to enter decimals and see the results
  So that I can convert decimals properly

  Scenario Outline:
    Given I am a user
    When I navigate to "/"
    And I have entered "<decimal>" into the decimal field
    Then I should see "<fraction>" in the fractional field
    And I should see "<moneyline>" in the moneyline field
    Examples:
      |fraction|decimal|moneyline|
      |1/5     |1.20   |-500.00  |
      |9/25    |1.36   |-277.78  |
      |13/10   |2.30   |+130.00  |
      |18/5    |4.60   |+360.00  |
