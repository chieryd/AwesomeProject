//
//  TestMapViewController.m
//  AwesomeProject
//
//  Created by chiery on 2016/12/23.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "TestMapViewController.h"
#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"

@interface TestMapViewController ()

@end

@implementation TestMapViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  self.title = @"测试地图页面";
  
  self.edgesForExtendedLayout = UIRectEdgeNone;
  
    NSURL *jsCodeLocation;
  
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"TestMapView"
                                                 initialProperties:nil
                                                     launchOptions:nil];
    rootView.backgroundColor = [UIColor whiteColor];
    self.view = rootView;
  
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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
