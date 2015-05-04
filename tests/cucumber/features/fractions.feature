Feature: Fractions Work
  
  As a user
  I want to be able to enter fractions and see the results
  So that I can convert fractions properly

  Scenario Outline:
    Given I am a user
    When I navigate to "/"
    And I have entered "<fraction>" into the fractional field
    Then I should see "<decimal>" in the decimal field
    And I should see "<moneyline>" in the moneyline field
    Examples:
      |fraction|decimal|moneyline|
      |1/5     |1.20   |-500.00  |
      |4/11    |1.36   |-275.00  |
      |13/10   |2.30   |+130.00  |
      |18/5    |4.60   |+360.00  |
