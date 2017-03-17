//
//  TestViewController.m
//  jsDemo
//
//  Created by Brook on 2017/3/17.
//  Copyright © 2017年 5wei. All rights reserved.
//

#import "TestViewController.h"
#import "CocosManager.h"

@interface TestViewController ()

@end

@implementation TestViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    UIView *m_cocosView = [[CocosManager instance] getCocosEaglView];
    [self.view addSubview:m_cocosView];
    
    [[CocosManager instance] startCocosScene002];
    
    UIButton *button = [[UIButton alloc] initWithFrame:CGRectMake(100, 100, 100, 200)];
    button.backgroundColor = [UIColor grayColor];
    [button setTitle:@"cmd" forState:UIControlStateNormal];
    [button addTarget:self action:@selector(buttonPressed) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:button];

    // Do any additional setup after loading the view.
}


-(void)buttonPressed{
    [[CocosManager instance] exitCocosGame];
    [self.navigationController popViewControllerAnimated:YES];
    //[[CocosManager instance] callJsEngineCallBack:@"engineCallback" withCmd:@"param1" withContent:@"param2"];
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
