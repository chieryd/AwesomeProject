//
//  ViewController.m
//  AwesomeProject
//
//  Created by chiery on 2016/12/23.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ViewController.h"
#import "TestMapViewController.h"

@interface ViewController ()
@property (nonatomic, strong) UIButton *testMapViewButton;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  
  self.title = @"这个是title";
  self.view.backgroundColor = [UIColor whiteColor];
  [self.view addSubview:self.testMapViewButton];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (UIButton *)testMapViewButton {
  if (!_testMapViewButton) {
    _testMapViewButton = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 200, 40)];
    _testMapViewButton.center = self.view.center;
    _testMapViewButton.backgroundColor = [UIColor blueColor];
    [_testMapViewButton setTitle:@"click testMapView" forState:UIControlStateNormal];
    [_testMapViewButton addTarget:self action:@selector(clickTestMapView) forControlEvents:UIControlEventTouchUpInside];
  }
  return _testMapViewButton;
}

- (void)clickTestMapView {
  TestMapViewController *vc = [TestMapViewController new];
  [self.navigationController pushViewController:vc animated:YES];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
