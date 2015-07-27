Feature: Videos

  Scenario: Video autoplays
    Given I am a user
    When I go to the base url
    Then I see a video
    And the video has a source
    And I see the "video counter start" is 1
    And I see the "video-counter-end" is not 0
    And I see the "video title" is not "Loading..."
    And I see the "video id" is not "..."
    And I see the "video timestamp" is not empty

  Scenario: Swiping between videos
    Given I am a user
    When I go to the base url
    Then I see a video
    And I see the "video counter start" is 1
    When I press the "right" arrow key
    Then I see the "video counter start" is 2
    When I press the "left" arrow key
    Then I see the "video counter start" is 1
    When I press the "left" arrow key
    Then I see I am on the last video
    When I press the "right" arrow key
    Then I see the "video counter start" is 1
    When I click the "next" video action
    Then I see the "video counter start" is 2
    When I click the "previous" video action
    Then I see the "video counter start" is 1
    When I click the "previous" video action
    Then I see I am on the last video
    When I click the "next" video action
    Then I see the "video counter start" is 1

  Scenario: Resizing video
    Given I am a user
    When I resize the window to "800" by "600"
    When I go to the base url
    Then I see a video
    Then I see the video has resized to "594" by "297.142857142857"
    When I resize the window to "1366" by "768"
    Then I see the video has resized to "944" by "463.809523809524"

  Scenario: Pausing a video
    Given I am a user
    When I go to the base url
    And I see a video
    And I press the "spacebar" key
    Then I see the video is paused
    When I press the "spacebar" key
    Then I see the video is playing

  Scenario: Endless Mode
    Given I am a user
    When I go to the base url
    Then I see a video
    And I see Endless Mode is "On"
    And I see the "video counter start" is 1
    When I wait for the video to end
    Then I see the "video counter start" is 2
    When I disable Endless Mode
    Then I see Endless Mode is "Off"
    When I wait for the video to end
    Then I see the "video counter start" is 2
